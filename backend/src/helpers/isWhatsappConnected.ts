import Whatsapp from "../models/Whatsapp";
import GetWhatsappWbot from "./GetWhatsappWbot";
import EnsureWbotSession from "./EnsureWbotSession";

const isWhatsappConnected = async (whatsapp: Whatsapp): Promise<boolean> => {
  try {
    EnsureWbotSession(await GetWhatsappWbot(whatsapp));
    return true;
  } catch {
    return false;
  }
};

export default isWhatsappConnected;
