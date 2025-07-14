import Chatbot from "../models/Chatbot";

export interface QueueData {
  name?: string;
  color?: string;
  companyId?: number;
  greetingMessage?: string;
  outOfHoursMessage?: string;
  schedules?: any[];
  chatbots?: Chatbot[];
  orderQueue?: number;
  ativarRoteador?: boolean;
  tempoRoteador: number;
  integrationId?: number | null;
  fileListId?: number | null;
  promptId?: number | null;
  closeTicket?: boolean;
}
