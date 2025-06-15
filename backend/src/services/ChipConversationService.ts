import ChipConversationList from "../models/ChipConversationList";
import { v4 as uuid } from "uuid";

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
