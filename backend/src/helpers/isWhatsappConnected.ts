import Whatsapp from "../models/Whatsapp";
import GetWhatsappWbot from "./GetWhatsappWbot";
import EnsureWbotSession from "./EnsureWbotSession";
import { StartWhatsAppSession } from "../services/WbotServices/StartWhatsAppSession";

const isWhatsappConnected = async (whatsapp: Whatsapp): Promise<boolean> => {
  try {
    // try to ensure current session is active
    EnsureWbotSession(await GetWhatsappWbot(whatsapp));
    return true;
  } catch {
    // attempt to restart the session once
    try {
      await StartWhatsAppSession(whatsapp, whatsapp.companyId);
      EnsureWbotSession(await GetWhatsappWbot(whatsapp));
      return true;
    } catch {
      return false;
    }
  }
};

export default isWhatsappConnected;
