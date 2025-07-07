import { WASocket } from "@whiskeysockets/baileys";
import AppError from "../errors/AppError";

const EnsureWbotSession = (wbot: WASocket) => {

  // wbot.ws.readyState follows the WebSocket ready state numeric enum.
  // 1 corresponds to an open connection.
  const READY_STATE_OPEN = 1;

  if (
    !wbot ||
    !wbot.ws ||
    (wbot.ws as any).readyState !== READY_STATE_OPEN ||
    !wbot.user
  ) {
    throw new AppError("ERR_WAPP_SESSION_NOT_READY");
  }

  return wbot;
};

export default EnsureWbotSession;

