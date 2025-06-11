import MaturationManager, { MaturationJob } from "./MaturationManager";

interface CreateMaturationData {
  chipId: string;
  days: number;
  conversations: string[];
}

export const createMaturation = (data: CreateMaturationData): MaturationJob => {
  return MaturationManager.createJob(data);
};

export const listMaturations = (): MaturationJob[] => {
  return MaturationManager.listJobs();
};

export const getMaturation = (id: string): MaturationJob | undefined => {
  return MaturationManager.getJob(id);
};

export const cancelMaturation = (id: string): void => {
  MaturationManager.cancelJob(id);
};
