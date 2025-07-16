import { Filterable, Op } from "sequelize";
import Ticket from "../../models/Ticket"
import Whatsapp from "../../models/Whatsapp"
import { getIO } from "../../libs/socket"
import formatBody from "../../helpers/Mustache";
import SendWhatsAppMessage from "./SendWhatsAppMessage";
import moment from "moment";
import { Sequelize } from "sequelize";
import ShowTicketService from "../TicketServices/ShowTicketService";
import { verifyMessage } from "./wbotMessageListener";
import TicketTraking from "../../models/TicketTraking";
import CreateLogTicketService from "../TicketServices/CreateLogTicketService";
import Company from "../../models/Company";
import logger from "../../utils/logger";
import { isNil } from "lodash";
import { sub } from "date-fns";

const closeTicket = async (ticket: any, body: string) => {
  await ticket.update({
    status: "closed",
    lastMessage: body,
    unreadMessages: 0,
    amountUsedBotQueues: 0,
    botFinishAt: null
  });
  await CreateLogTicketService({
    userId: ticket.userId || null,
    queueId: ticket.queueId || null,
    ticketId: ticket.id,
    type: "autoClose"
  });
};

const handleBotAutoCloseTickets = async (companyId: number, whatsapp: Whatsapp) => {
  const ticketsToClose = await Ticket.findAll({
    where: {
      status: "open",
      companyId,
      whatsappId: whatsapp.id,
      botFinishAt: { [Op.lt]: Sequelize.literal('NOW()') }
    }
  });

  if (ticketsToClose && ticketsToClose.length > 0) {
    logger.info(`Encontrou ${ticketsToClose.length} atendimentos para encerrar por inatividade do bot na empresa ${companyId} - na conexão ${whatsapp.name}!`);
    for (const ticket of ticketsToClose) {
      await ticket.reload();
      const ticketTraking = await TicketTraking.findOne({
        where: { ticketId: ticket.id, finishedAt: null }
      });

      let bodyMessageInactive = "";
      if (!isNil(whatsapp.inactiveMessage) && whatsapp.inactiveMessage !== "") {
        bodyMessageInactive = formatBody(`\u200e ${whatsapp.inactiveMessage}`, ticket);
        const sentMessage = await SendWhatsAppMessage({ body: bodyMessageInactive, ticket });
        await verifyMessage(sentMessage, ticket, ticket.contact);
      }

      await closeTicket(ticket, bodyMessageInactive);

      await ticketTraking.update({
        finishedAt: new Date(),
        closedAt: new Date(),
        whatsappId: ticket.whatsappId,
        userId: ticket.userId,
      });

      const io = getIO();
      io.of(companyId.toString()).emit(`company-${companyId}-ticket`, {
        action: "delete",
        ticketId: ticket.id
      });
    }
  }
};

const handleOpenTickets = async (companyId: number, whatsapp: Whatsapp) => {
  const currentTime = new Date();
  const brazilTimeZoneOffset = -3 * 60; // Fuso horário do Brasil é UTC-3
  const currentTimeBrazil = new Date(currentTime.getTime() + brazilTimeZoneOffset * 60000); // Adiciona o offset ao tempo atual

  let timeInactiveMessage = Number(whatsapp.timeInactiveMessage || 0);
  let expiresTime = Number(whatsapp.expiresTicket || 0);

  if (!isNil(expiresTime) && expiresTime > 0) {

    if (!isNil(timeInactiveMessage) && timeInactiveMessage > 0) {
      let whereCondition1: Filterable["where"];

      whereCondition1 = {
        status: "open",
        companyId,
        whatsappId: whatsapp.id,
        updatedAt: {
          [Op.lt]: +sub(new Date(), {
            minutes: Number(timeInactiveMessage)
          })
        },
        imported: null,
        sendInactiveMessage: false
      };

      if (Number(whatsapp.whenExpiresTicket) === 1) {
        whereCondition1 = {
          ...whereCondition1,
          fromMe: true
        };
      }

      const ticketsForInactiveMessage = await Ticket.findAll({
        where:  whereCondition1 
      });

      if (ticketsForInactiveMessage && ticketsForInactiveMessage.length > 0) {
        logger.info(`Encontrou ${ticketsForInactiveMessage.length} atendimentos para enviar mensagem de inatividade na empresa ${companyId}- na conexão ${whatsapp.name}!`)
        await Promise.all(ticketsForInactiveMessage.map(async ticket => {
          await ticket.reload();
          if (!ticket.sendInactiveMessage) {
            const bodyMessageInactive = formatBody(`\u200e ${whatsapp.inactiveMessage}`, ticket);
            const sentMessage = await SendWhatsAppMessage({ body: bodyMessageInactive, ticket: ticket });
            await verifyMessage(sentMessage, ticket, ticket.contact);
            await ticket.update({ sendInactiveMessage: true, fromMe: true });
          }
        }));
      }

      expiresTime += timeInactiveMessage; // Adicionando o tempo de inatividade ao tempo de expiração
    }

    let whereCondition: Filterable["where"];

    whereCondition = {
      status: "open",
      companyId,
      whatsappId: whatsapp.id,
      updatedAt: {
        [Op.lt]: +sub(new Date(), {
          minutes: Number(expiresTime)
        })
      },
      imported: null
    }

    if (timeInactiveMessage > 0) {
      whereCondition = {
        ...whereCondition,
        sendInactiveMessage: true,
      };
    }

    if (Number(whatsapp.whenExpiresTicket) === 1) {
      whereCondition = {
        ...whereCondition,
        fromMe: true
      };
    }

    const ticketsToClose = await Ticket.findAll({
      where: whereCondition
    });


    if (ticketsToClose && ticketsToClose.length > 0) {
      logger.info(`Encontrou ${ticketsToClose.length} atendimentos para encerrar na empresa ${companyId} - na conexão ${whatsapp.name}!`);

      for (const ticket of ticketsToClose) {
        await ticket.reload();
        const ticketTraking = await TicketTraking.findOne({
          where: { ticketId: ticket.id, finishedAt: null }
        });

        let bodyExpiresMessageInactive = "";

        if (!isNil(whatsapp.expiresInactiveMessage) && whatsapp.expiresInactiveMessage !== "") {
          bodyExpiresMessageInactive = formatBody(`\u200e${whatsapp.expiresInactiveMessage}`, ticket);
          const sentMessage = await SendWhatsAppMessage({ body: bodyExpiresMessageInactive, ticket: ticket });
          await verifyMessage(sentMessage, ticket, ticket.contact);
        }

        // Como o campo sendInactiveMessage foi atualizado, podemos garantir que a mensagem foi enviada
        await closeTicket(ticket, bodyExpiresMessageInactive);

        await ticketTraking.update({
          finishedAt: new Date(),
          closedAt: new Date(),
          whatsappId: ticket.whatsappId,
          userId: ticket.userId,
        });
        // console.log("emitiu socket 144", ticket.id)

        const io = getIO();
        io.of(companyId.toString()).emit(`company-${companyId}-ticket`, {
          action: "delete",
          ticketId: ticket.id
        });
      }
    }
  }
};



const handleNPSTickets = async (companyId: number, whatsapp: any) => {
  const expiresTime = Number(whatsapp.expiresTicketNPS);
  const dataLimite = moment().subtract(expiresTime, 'minutes');

  const ticketsToClose = await Ticket.findAll({
    where: {
      status: "nps",
      companyId,
      whatsappId: whatsapp.id,
      updatedAt: { [Op.lt]: dataLimite.toDate() },
      imported: null
    }
  });

  if (ticketsToClose && ticketsToClose.length > 0) {
    logger.info(`Encontrou ${ticketsToClose.length} atendimentos para encerrar NPS na empresa ${companyId} - na conexão ${whatsapp.name}!`);
    await Promise.all(ticketsToClose.map(async ticket => {
      await ticket.reload();
      const ticketTraking = await TicketTraking.findOne({
        where: { ticketId: ticket.id, finishedAt: null }
      });

      let bodyComplationMessage = "";

      if (!isNil(whatsapp.completionMessage) && whatsapp.completionMessage !== "") {
        bodyComplationMessage = formatBody(`\u200e${whatsapp.completionMessage}`, ticket);
        const sentMessage = await SendWhatsAppMessage({ body: bodyComplationMessage, ticket: ticket });
        await verifyMessage(sentMessage, ticket, ticket.contact);
      }

      await closeTicket(ticket, bodyComplationMessage);

      await ticketTraking.update({
        finishedAt: moment().toDate(),
        closedAt: moment().toDate(),
        whatsappId: ticket.whatsappId,
        userId: ticket.userId,
      });

      getIO().of(companyId.toString()).emit(`company-${companyId}-ticket`, {
        action: "delete",
        ticketId: ticket.id
      });
    }));
  }
};

export const ClosedAllOpenTickets = async (companyId: number): Promise<void> => {
  try {
    const whatsapps = await Whatsapp.findAll({
      attributes: ["id", "name", "status", "timeSendQueue", "sendIdQueue", "timeInactiveMessage",
        "expiresInactiveMessage", "inactiveMessage", "expiresTicket", "expiresTicketNPS", "whenExpiresTicket",
        "completionMessage"],
      where: {
        companyId: companyId,
        status: "CONNECTED"
      }
    });

    // Agora você pode iterar sobre as instâncias de Whatsapp diretamente
    if (whatsapps.length > 0) {
      for (const whatsapp of whatsapps) {
        await handleBotAutoCloseTickets(companyId, whatsapp);
        if (whatsapp.expiresTicket) {
          await handleOpenTickets(companyId, whatsapp);
        }
        if (whatsapp.expiresTicketNPS) {
          await handleNPSTickets(companyId, whatsapp);
        }
      }
    }

  } catch (error) {
    console.error('Erro:', error);
  }
};
