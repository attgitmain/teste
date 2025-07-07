import { getWbot } from "../libs/wbot";
import Whatsapp from "../models/Whatsapp";
import AppError from "../errors/AppError";
import { WASocket } from "@whiskeysockets/baileys";

type Session = WASocket & {
  id?: number;
};
const EnsureWbotSession = (input: Whatsapp | Session): Session => {
  const wbot = ("ws" in input ? (input as Session) : getWbot(input.id));

  if (
    !wbot ||
    !wbot.ws ||
    ((wbot.ws as any).readyState !== "open" && (wbot.ws as any).readyState !== 1) ||
    !wbot.user
  ) {
    throw new AppError("ERR_WAPP_SESSION_NOT_READY");
  }

  return wbot;
};

export default EnsureWbotSession;
