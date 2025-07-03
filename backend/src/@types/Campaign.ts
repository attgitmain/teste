export interface ICampaignData {
  id?: number | string;
  name: string;
  status: string;
  confirmation: boolean;
  scheduledAt: string;
  companyId: number;
  contactListId: number;
  tagListId?: number | string;
  userId: number | string;
  queueId: number | string;
  statusTicket: string;
  openTicket: string;
}
