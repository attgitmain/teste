import { v4 as uuid } from "uuid";
import ChipMaturation from "../../models/ChipMaturation";
import ChipMaturationLog from "../../models/ChipMaturationLog";
import logger from "../../utils/logger";
import JobRunner from "./JobRunner";

export type MaturationStatus = "running" | "completed" | "canceled";

export interface MaturationJob {
  id: string;
  originChipId: string;
  targetChipIds: string[];
  days: number;
  intervalHours: number;
  intervalMinutes: number;
  conversations: string[];
  startAt: Date;
  endAt: Date;
  status: MaturationStatus;
  history: { timestamp: Date; from: string; to: string; message: string; success: boolean; error?: string }[];
  companyId: number;
  currentIndex: number;
  lastFrom?: string;
}

class MaturationManager {
  private jobs: Map<string, JobRunner> = new Map();

  public listJobs(): MaturationJob[] {
    return Array.from(this.jobs.values()).map(job => job.serialize());
  }


  public async initFromDB() {
    const records = await ChipMaturation.findAll({ where: { status: "running" } });
    records.forEach(record => {
      const job: MaturationJob = {
        id: record.id,
        originChipId: record.originChipId,
        targetChipIds: record.targetChipIds || [],
        days: record.days,
        intervalHours: (record as any).intervalHours || 0,
        intervalMinutes: (record as any).intervalMinutes || ((record as any).intervalHours || 1) * 60,
        conversations: record.conversations || [],
        startAt: record.startAt,
        endAt: record.endAt,
        status: record.status as MaturationStatus,
        companyId: record.companyId,
        history: [],
        currentIndex: 0,
        lastFrom: undefined
      };
      const runner = new JobRunner(job);
      this.jobs.set(job.id, runner);
      runner.start(false);
    });
  }

  public async createJob(data: {
    originChipId: string;
    targetChipIds: string[];
    days: number;
    intervalHours: number;
    intervalMinutes: number;
    conversations: string[];
    companyId: number;
  }): Promise<MaturationJob> {
    const id = uuid();
    const startAt = new Date();
    const endAt = new Date(startAt.getTime() + data.days * 24 * 60 * 60 * 1000);

    await ChipMaturation.create({
      id,
      originChipId: data.originChipId,
      targetChipIds: data.targetChipIds,
      days: data.days,
      intervalHours: data.intervalHours,
      intervalMinutes: data.intervalMinutes,
      conversations: data.conversations,
      startAt,
      endAt,
      status: "running",
      companyId: data.companyId
    });

    const job: MaturationJob = {
      id,
      originChipId: data.originChipId,
      targetChipIds: data.targetChipIds,
      days: data.days,
      intervalHours: data.intervalHours,
      intervalMinutes: data.intervalMinutes,
      conversations: data.conversations,
      startAt,
      endAt,
      status: "running",
      history: [],
      companyId: data.companyId,
      currentIndex: 0,
      lastFrom: undefined
    };
    const runner = new JobRunner(job);
    this.jobs.set(id, runner);

    try {
      runner.start(true);
    } catch (err) {
      logger.error(`Failed to start maturation job ${id}: ${err}`);
    }

    return runner.serialize();
  }

  public getJob(id: string): MaturationJob | undefined {
    const runner = this.jobs.get(id);
    return runner?.serialize();
  }

  public async cancelJob(id: string): Promise<void> {
    const runner = this.jobs.get(id);
    if (!runner) return;
    await runner.cancel();
    this.jobs.delete(id);
  }

  public async listLogs(id: string) {
    return ChipMaturationLog.findAll({ where: { chipMaturationId: id }, order: [["createdAt", "ASC"]] });
  }
}

export default new MaturationManager();
