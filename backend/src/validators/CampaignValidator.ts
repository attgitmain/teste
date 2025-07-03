export interface CampaignStatusData {
  scheduledAt?: string | null;
  status: string;
}

export function applyStatusRules(data: CampaignStatusData) {
  if (data.scheduledAt && data.scheduledAt !== "") {
    if (data.status === "INATIVA" || !data.status) {
      data.status = "PROGRAMADA";
    }
  }
}
