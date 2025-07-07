import { Request, Response } from "express";
import * as ReportLogService from "../services/ReportService/ReportLogService";

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.query;
  const logs = await ReportLogService.listLogs(companyId ? Number(companyId) : undefined);
  return res.json(logs);
};
