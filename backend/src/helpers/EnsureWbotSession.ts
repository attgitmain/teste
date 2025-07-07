import { getWbot } from "../libs/wbot";
import Whatsapp from "../models/Whatsapp";
import AppError from "../errors/AppError";

const EnsureWbotSession = (whatsapp: Whatsapp) => {
  const wbot = getWbot(whatsapp.id);

  if (!wbot || !wbot.ws || wbot.ws.readyState !== "open" || !wbot.user) {
    throw new AppError("ERR_WAPP_SESSION_NOT_READY");
  }

  return wbot;
};

export default EnsureWbotSession;
