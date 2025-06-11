import { v4 as uuid } from "uuid";
import Whatsapp from "../../models/Whatsapp";
import ChipMaturation from "../../models/ChipMaturation";
import ChipMaturationLog from "../../models/ChipMaturationLog";
import { SendMessage } from "../../helpers/SendMessage";
import { getIO } from "../../libs/socket";

export type MaturationStatus = "running" | "completed" | "canceled";

export interface MaturationJob {
  id: string;
  originChipId: string;
  targetChipIds: string[];
  days: number;
  intervalHours: number;
  conversations: string[];
  startAt: Date;
  endAt: Date;
  status: MaturationStatus;
  history: { timestamp: Date; from: string; to: string; message: string; success: boolean; error?: string }[];
  timeout?: NodeJS.Timeout;
  companyId: number;
  currentIndex: number;
  lastFrom?: string;
}

class MaturationManager {
  private jobs: Map<string, MaturationJob> = new Map();

  public listJobs(): MaturationJob[] {
    return Array.from(this.jobs.values());
  }

  private scheduleNext(job: MaturationJob) {
    const delay = job.intervalHours * 60 * 60 * 1000;
    job.timeout = setTimeout(() => this.executeJob(job.id), delay);
  }

  private async executeJob(id: string) {
    const job = this.jobs.get(id);
    if (!job || job.status !== "running") return;

    const chips = [job.originChipId, ...job.targetChipIds];
    let from = chips[Math.floor(Math.random() * chips.length)];
    if (job.lastFrom) {
      let attempts = 0;
      while (from === job.lastFrom && chips.length > 1 && attempts < 10) {
        from = chips[Math.floor(Math.random() * chips.length)];
        attempts += 1;
      }
    }
    let to = chips[Math.floor(Math.random() * chips.length)];
    while (to === from && chips.length > 1) {
      to = chips[Math.floor(Math.random() * chips.length)];
    }
    const msg = job.conversations[job.currentIndex % job.conversations.length];
    job.currentIndex += 1;
    job.lastFrom = from;

    const whatsapp = await Whatsapp.findOne({ where: { number: from, companyId: job.companyId } });
    let success = false;
    let error: string | undefined;
    if (whatsapp) {
      try {
        await SendMessage(whatsapp, { number: to, body: msg, companyId: job.companyId });
        success = true;
      } catch (err: any) {
        error = err.message;
      }
    } else {
      error = "sender not found";
    }

    await ChipMaturationLog.create({
      chipMaturationId: id,
      fromChip: from,
      toChip: to,
      message: msg,
      success,
      error
    });

    job.history.push({ timestamp: new Date(), from, to, message: msg, success, error });

    if (new Date() >= job.endAt) {
      job.status = "completed";
      await ChipMaturation.update({ status: "completed" }, { where: { id } });
    } else {
      this.scheduleNext(job);
    }

    const io = getIO();
    io.of(String(job.companyId)).emit(`company-${job.companyId}-maturation`, { action: "update", record: this.serializeJob(job) });
  }

  private serializeJob(job: MaturationJob) {
    const { timeout, ...rest } = job;
    return {
      ...rest,
      progress:
        (Date.now() - job.startAt.getTime()) /
        (job.endAt.getTime() - job.startAt.getTime())
    };
  }

  public async initFromDB() {
    const records = await ChipMaturation.findAll({ where: { status: "running" } });
    records.forEach(record => {
      const job: MaturationJob = {
        id: record.id,
        originChipId: record.originChipId,
        targetChipIds: record.targetChipIds || [],
        days: record.days,
        intervalHours: (record as any).intervalHours || 1,
        conversations: record.conversations || [],
        startAt: record.startAt,
        endAt: record.endAt,
        status: record.status as MaturationStatus,
        companyId: record.companyId,
        history: [],
        currentIndex: 0,
        lastFrom: undefined
      };
      this.jobs.set(job.id, job);
      this.scheduleNext(job);
    });
  }

  public async createJob(data: {
    originChipId: string;
    targetChipIds: string[];
    days: number;
    intervalHours: number;
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
      conversations: data.conversations,
      startAt,
      endAt,
      status: "running",
      history: [],
      companyId: data.companyId,
      currentIndex: 0,
      lastFrom: undefined
    };

    this.jobs.set(id, job);

    await this.executeJob(id);

    return job;
  }

  public getJob(id: string): MaturationJob | undefined {
    return this.jobs.get(id);
  }

  public async cancelJob(id: string): Promise<void> {
    const job = this.jobs.get(id);
    if (!job) return;
    if (job.timeout) clearTimeout(job.timeout);
    job.status = "canceled";
    await ChipMaturation.update({ status: "canceled" }, { where: { id } });
    this.jobs.delete(id);
  }

  public async listLogs(id: string) {
    return ChipMaturationLog.findAll({ where: { chipMaturationId: id }, order: [["createdAt", "ASC"]] });
  }
}

export default new MaturationManager();
