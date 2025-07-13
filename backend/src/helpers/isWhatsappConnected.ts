import Whatsapp from "../models/Whatsapp";
import GetWhatsappWbot from "./GetWhatsappWbot";
import EnsureWbotSession from "./EnsureWbotSession";
import { StartWhatsAppSession } from "../services/WbotServices/StartWhatsAppSession";
import logger from "../utils/logger";

const isWhatsappConnected = async (whatsapp: Whatsapp): Promise<boolean> => {
  try {
    EnsureWbotSession(await GetWhatsappWbot(whatsapp));
    return true;
  } catch (err) {
    logger.warn(`[isWhatsappConnected] ensure failed for ${whatsapp.id}:`, err);
    try {
      // restarts the session using WhatsApp ID and company ID
      await StartWhatsAppSession(whatsapp.id, whatsapp.companyId);
      EnsureWbotSession(await GetWhatsappWbot(whatsapp));
      return true;
    } catch (restartErr) {
      logger.error(
        `[isWhatsappConnected] restart failed for ${whatsapp.id}:`,
        restartErr
      );
      return false;
    }
  }
};

export default isWhatsappConnected;
