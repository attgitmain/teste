import { Op } from "sequelize";
import Campaign from "../../models/Campaign";
import CampaignShipping from "../../models/CampaignShipping";
import { campaignQueue } from "../../queues";
import AppError from "../../errors/AppError";

export async function CancelService(id: number, companyId: number) {
  const campaign = await Campaign.findOne({ where: { id, companyId } });
  if (!campaign) {
    throw new AppError("ERR_NO_CAMPAIGN_FOUND", 404);
  }
  await campaign.update({ status: "CANCELADA" });

  const recordsToCancel = await CampaignShipping.findAll({
    where: {
      campaignId: campaign.id,
      jobId: { [Op.not]: null },
      deliveredAt: null
    }
  });

  const promises = [];

  for (let record of recordsToCancel) {
    const job = await campaignQueue.getJob(+record.jobId);
    if (job) {
      promises.push(job.remove());
    }
  }

  await Promise.all(promises);
}
