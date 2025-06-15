import { Request, Response } from "express";
import * as ChipConversationService from "../services/ChipConversationService";

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const data = await ChipConversationService.listLists(companyId);
  return res.json(data);
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { name } = req.body;
  const file = req.file as Express.Multer.File;
  if (!file || !name) {
    return res.status(400).json({ error: "Invalid data" });
  }
  const text = file.buffer.toString("utf-8");
  const messages = text
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);
  const list = await ChipConversationService.createList({ name, messages, companyId });
  return res.status(201).json(list);
};
