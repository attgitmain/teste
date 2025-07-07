import ReportLog from "../../models/ReportLog";

interface CreateData {
  companyId: number;
  toNumber: string;
  body: string;
  success: boolean;
  error?: string;
}

export const createLog = async (data: CreateData): Promise<ReportLog> => {
  return ReportLog.create(data);
};

export const listLogs = async (companyId?: number): Promise<ReportLog[]> => {
  const where = companyId ? { companyId } : undefined;
  return ReportLog.findAll({ where, order: [["createdAt", "DESC"]] });
};
