import { execSync } from "child_process";
import logger from "./logger";

export default function runMigrations(): void {
  try {
    execSync("npx sequelize db:migrate", { stdio: "inherit" });
    logger.info("Database migrations executed successfully");
  } catch (err) {
    logger.error("Error running database migrations");
    logger.error(err);
  }
}
