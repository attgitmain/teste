import { v4 as uuid } from "uuid";

export type MaturationStatus = "running" | "completed" | "canceled";

export interface MaturationJob {
  id: string;
  chipId: string;
  days: number;
  conversations: string[];
  startAt: Date;
  endAt: Date;
  status: MaturationStatus;
  history: { timestamp: Date; message: string }[];
  interval?: NodeJS.Timeout;
}

class MaturationManager {
  private jobs: Map<string, MaturationJob> = new Map();

  public listJobs(): MaturationJob[] {
    return Array.from(this.jobs.values());
  }

  public createJob(data: {
    chipId: string;
    days: number;
    conversations: string[];
  }): MaturationJob {
    const id = uuid();
    const startAt = new Date();
    const endAt = new Date(startAt.getTime() + data.days * 24 * 60 * 60 * 1000);
    const job: MaturationJob = {
      id,
      chipId: data.chipId,
      days: data.days,
      conversations: data.conversations,
      startAt,
      endAt,
      status: "running",
      history: [],
    };

    const interval = setInterval(() => {
      if (job.status !== "running") return;
      const msg =
        data.conversations[
          Math.floor(Math.random() * data.conversations.length)
        ];
      job.history.push({ timestamp: new Date(), message: msg });
      if (new Date() >= job.endAt) {
        job.status = "completed";
        clearInterval(interval);
      }
    }, 60 * 60 * 1000); // every hour

    job.interval = interval;
    this.jobs.set(id, job);
    return job;
  }

  public getJob(id: string): MaturationJob | undefined {
    return this.jobs.get(id);
  }

  public cancelJob(id: string): void {
    const job = this.jobs.get(id);
    if (!job) return;
    if (job.interval) clearInterval(job.interval);
    this.jobs.delete(id);
  }
}

export default new MaturationManager();
