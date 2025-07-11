import AppError from "../errors/AppError";
import Whatsapp from "../models/Whatsapp";
import GetDefaultWhatsAppByUser from "./GetDefaultWhatsAppByUser";

const GetDefaultWhatsApp = async (
  whatsappId?: number,
  companyId: number | null = null,
  userId?: number
): Promise<Whatsapp> => {
  let connection: Whatsapp | null = null;

  console.log({ whatsappId, companyId, userId });

  if (whatsappId) {
    connection = await Whatsapp.findOne({
      where: { id: whatsappId, companyId, status: "CONNECTED" }
    });
  }

  if (!connection) {
    connection = await Whatsapp.findOne({
      where: { isDefault: true, status: "CONNECTED", companyId }
    });
  }

  if (!connection) {
    connection = await Whatsapp.findOne({
      where: { status: "CONNECTED", companyId }
    });
  }

  if (userId) {
    const whatsappByUser = await GetDefaultWhatsAppByUser(userId);
    if (whatsappByUser?.status === "CONNECTED") {
      connection = whatsappByUser;
    }
  }

  if (!connection) {
    throw new AppError(`ERR_NO_DEF_WAPP_FOUND in COMPANY ${companyId}`);
  }

  return connection;
};

export default GetDefaultWhatsApp;
