import { Request, Response } from "express";
import * as MaturationService from "../services/MaturationService";
import { MaturationJob } from "../services/MaturationService/MaturationManager";

const formatJob = (job: MaturationJob) => {
  const { timeout, ...rest } = job;
  return {
    ...rest,
    progress:
      (Date.now() - job.startAt.getTime()) /
      (job.endAt.getTime() - job.startAt.getTime()),
  };
};

export const index = (req: Request, res: Response): Response => {
  const jobs = MaturationService.listMaturations().map(formatJob);
  return res.json(jobs);
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { originChipId, targetChipIds, days, intervalHours, intervalMinutes, conversations, companyId } = req.body;
  if (!originChipId || !targetChipIds?.length || !conversations || !Array.isArray(conversations) || !days) {
    return res.status(400).json({ error: "Invalid data" });
  }
  const job = await MaturationService.createMaturation({
    originChipId,
    targetChipIds,
    days: Number(days),
    intervalHours: Number(intervalHours) || 0,
    intervalMinutes: Number(intervalMinutes) || ((Number(intervalHours) || 1) * 60),
    conversations,
    companyId
  });
  return res.status(201).json(formatJob(job));
};

export const show = (req: Request, res: Response): Response => {
  const { id } = req.params;
  const job = MaturationService.getMaturation(id);
  if (!job) {
    return res.status(404).json({ error: "Not found" });
  }
  return res.json(formatJob(job));
};

export const remove = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  await MaturationService.cancelMaturation(id);
  return res.status(200).json({});
};

export const logs = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const data = await MaturationService.listLogs(id);
  return res.json(data);
};
