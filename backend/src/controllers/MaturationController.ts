import { Request, Response } from "express";
import * as MaturationService from "../services/MaturationService";
import { MaturationJob } from "../services/MaturationService/MaturationManager";
import User from "../models/User";

const formatJob = (job: MaturationJob) => {
  return {
    ...job,
    progress:
      (Date.now() - job.startAt.getTime()) /
      (job.endAt.getTime() - job.startAt.getTime()),
  };
};

export const index = async (req: Request, res: Response): Promise<Response> => {
  const user = await User.findByPk(req.user.id);
  const isSuper = !!user?.super;
  const jobs = MaturationService.listMaturations()
    .filter(job => isSuper || job.companyId === req.user.companyId)
    .map(formatJob);
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

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const job = MaturationService.getMaturation(id);
  if (!job) {
    return res.status(404).json({ error: "Not found" });
  }
  const user = await User.findByPk(req.user.id);
  const isSuper = !!user?.super;
  if (!isSuper && job.companyId !== req.user.companyId) {
    return res.status(403).json({ error: "Not authorized" });
  }
  return res.json(formatJob(job));
};

export const remove = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const job = MaturationService.getMaturation(id);
  if (!job) {
    return res.status(404).json({ error: "Not found" });
  }
  const user = await User.findByPk(req.user.id);
  const isSuper = !!user?.super;
  if (!isSuper && job.companyId !== req.user.companyId) {
    return res.status(403).json({ error: "Not authorized" });
  }
  await MaturationService.cancelMaturation(id);
  return res.status(200).json({});
};

export const logs = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const job = MaturationService.getMaturation(id);
  if (!job) {
    return res.status(404).json({ error: "Not found" });
  }
  const user = await User.findByPk(req.user.id);
  const isSuper = !!user?.super;
  if (!isSuper && job.companyId !== req.user.companyId) {
    return res.status(403).json({ error: "Not authorized" });
  }
  const data = await MaturationService.listLogs(id);
  return res.json(data);
};
