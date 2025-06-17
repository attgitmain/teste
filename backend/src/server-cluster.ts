import gracefulShutdown from "http-graceful-shutdown";
import app from "./app";
import { initIO } from "./libs/socket";
import logger from "./utils/logger";
import { StartAllWhatsAppsSessions } from "./services/WbotServices/StartAllWhatsAppsSessions";
import Company from "./models/Company";
import { startQueueProcess } from "./queues";

const express = require("express")
const os = require("os")
const cluster = require("cluster")

const PORT = process.env.PORT || 4000

const clusterWorkerSize = os.cpus().length

logger.info(`Cluster size: ${clusterWorkerSize}`)

if (clusterWorkerSize > 1) {
  if (cluster.isMaster) {
    for (let i = 0; i < clusterWorkerSize; i++) {
      cluster.fork()
    }

    cluster.on("exit", function (worker) {
      logger.warn(`Worker ${worker.id} has exited.`)
    })
  } else {
    const app = express()

    const server = app.listen(process.env.PORT, async () => {
      const companies = await Company.findAll();
      const allPromises: any[] = [];
      companies.map(async c => {
        const promise = StartAllWhatsAppsSessions(c.id);
        allPromises.push(promise);
      });

      Promise.all(allPromises).then(async () => {
        await startQueueProcess();
      });
      logger.info(`Server started on port: ${process.env.PORT} and worker ${process.pid}`);
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
} else {
  const app = express()

  app.listen(PORT, function () {
    logger.info(`Express server listening on port ${PORT} with the single worker ${process.pid}`)
  })
}
