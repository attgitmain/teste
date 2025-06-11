import MaturationManager, { MaturationJob } from "./MaturationManager";

interface CreateMaturationData {
  originChipId: string;
  targetChipIds: string[];
  days: number;
  intervalHours: number;
  conversations: string[];
  companyId: number;
}

export const createMaturation = async (data: CreateMaturationData): Promise<MaturationJob> => {
  return MaturationManager.createJob(data);
};

export const listMaturations = (): MaturationJob[] => {
  return MaturationManager.listJobs();
};

export const getMaturation = (id: string): MaturationJob | undefined => {
  return MaturationManager.getJob(id);
};

export const cancelMaturation = async (id: string): Promise<void> => {
  await MaturationManager.cancelJob(id);
};

export const listLogs = async (id: string) => {
  return MaturationManager.listLogs(id);
};

export const initMaturations = async () => {
  await MaturationManager.initFromDB();
};
