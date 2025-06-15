import ChipConversationList from "../models/ChipConversationList";
import { v4 as uuid } from "uuid";
import AppError from "../errors/AppError";

interface CreateData {
  name: string;
  messages: string[];
  companyId: number;
}

export const createList = async ({ name, messages, companyId }: CreateData) => {
  const id = uuid();
  const list = await ChipConversationList.create({ id, name, messages, companyId });
  return list;
};

export const listLists = async (companyId: number) => {
  return ChipConversationList.findAll({ where: { companyId } });
};

export const deleteList = async (id: string): Promise<void> => {
  const list = await ChipConversationList.findOne({ where: { id } });
  if (!list) {
    throw new AppError("ERR_NO_CONVERSATION_LIST_FOUND", 404);
  }
  await list.destroy();
};
