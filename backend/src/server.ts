import 'dotenv/config';
import gracefulShutdown from "http-graceful-shutdown";
import https from 'https'; // Importando https para o servidor
import fs from 'fs'; // Para ler os arquivos do certificado
import path from 'path';
import app from "./app";
import cron from "node-cron";
import { initIO } from "./libs/socket";
import logger from "./utils/logger";
import { StartAllWhatsAppsSessions } from "./services/WbotServices/StartAllWhatsAppsSessions";
import Company from "./models/Company";
import BullQueue from './libs/queue';
import { startQueueProcess } from "./queues";

if (process.env.CERTIFICADOS == "true") {
  
  const httpsOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_FILE), 
    cert: fs.readFileSync(process.env.SSL_CRT_FILE) 
  };

  const server = https.createServer(httpsOptions, app).listen(process.env.PORT, async () => {
    const companies = await Company.findAll({
      where: { status: true },
      attributes: ["id"]
    });

    const allPromises: any[] = [];
    companies.map(async c => {
      const promise = StartAllWhatsAppsSessions(c.id);
      allPromises.push(promise);
    });

    Promise.all(allPromises).then(async () => {
      await startQueueProcess();
    });

    if (process.env.REDIS_URI_ACK && process.env.REDIS_URI_ACK !== '') {
      BullQueue.process();
    }

    logger.info(`Server started on port: ${process.env.PORT} with HTTPS`);
  });

  process.on("uncaughtException", err => {
    console.error(`${new Date().toUTCString()} uncaughtException:`, err.message);
    console.error(err.stack);
    process.exit(1);
  });
  
  process.on("unhandledRejection", (reason, p) => {
    console.error(
      `${new Date().toUTCString()} unhandledRejection:`,
      reason,
      p
    );
    process.exit(1);
  });
  
  initIO(server);
  gracefulShutdown(server);

} else {
  const server = app.listen(process.env.PORT, async () => {
    const companies = await Company.findAll({
      where: { status: true },
      attributes: ["id"]
    });
  
    const allPromises: any[] = [];
    companies.map(async c => {
      const promise = StartAllWhatsAppsSessions(c.id);
      allPromises.push(promise);
    });
  
    Promise.all(allPromises).then(async () => {
  
      await startQueueProcess();
    });
  
    if (process.env.REDIS_URI_ACK && process.env.REDIS_URI_ACK !== '') {
      BullQueue.process();
    }
  
    logger.info(`Server started on port: ${process.env.PORT}`);
  });

  process.on("uncaughtException", err => {
    console.error(`${new Date().toUTCString()} uncaughtException:`, err.message);
    console.error(err.stack);
    process.exit(1);
  });
  
  process.on("unhandledRejection", (reason, p) => {
    console.error(
      `${new Date().toUTCString()} unhandledRejection:`,
      reason,
      p
    );
    process.exit(1);
  });
  
  initIO(server);
  gracefulShutdown(server);
  
}


