import { Request, Response } from "express";
import * as MaturationService from "../services/MaturationService";
import { MaturationJob } from "../services/MaturationService/MaturationManager";

const formatJob = (job: MaturationJob) => {
  const { interval, ...rest } = job;
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

export const store = (req: Request, res: Response): Response => {
  const { chipId, days, conversations } = req.body;
  if (!chipId || !days || !conversations || !Array.isArray(conversations)) {
    return res.status(400).json({ error: "Invalid data" });
  }
  const job = MaturationService.createMaturation({
    chipId,
    days: Number(days),
    conversations,
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

export const remove = (req: Request, res: Response): Response => {
  const { id } = req.params;
  MaturationService.cancelMaturation(id);
  return res.status(200).json({});
};
