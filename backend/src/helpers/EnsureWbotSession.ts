import { getWbot } from "../libs/wbot";
import Whatsapp from "../models/Whatsapp";
import AppError from "../errors/AppError";

const EnsureWbotSession = (whatsapp: Whatsapp) => {
  const wbot = getWbot(whatsapp.id);

  // wbot.ws.readyState follows the WebSocket ready state numeric enum.
  // 1 corresponds to an open connection.
  const READY_STATE_OPEN = 1;

  if (!wbot || !wbot.ws || wbot.ws.readyState !== READY_STATE_OPEN || !wbot.user) {
    throw new AppError("ERR_WAPP_SESSION_NOT_READY");
  }

  return wbot;
};

export default EnsureWbotSession;