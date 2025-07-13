import Whatsapp from "../../models/Whatsapp";
import ChipMaturation from "../../models/ChipMaturation";
import ChipMaturationLog from "../../models/ChipMaturationLog";
import { SendMessage } from "../../helpers/SendMessage";
import { getIO } from "../../libs/socket";
import { MaturationJob } from "./MaturationManager";

class JobRunner {
  private timeout?: NodeJS.Timeout;

  constructor(private job: MaturationJob) {}

  public start(immediate = true) {
    if (immediate) {
      this.scheduleNext(0);
    } else {
      this.scheduleNext();
    }
  }

  public serialize() {
    const { timeout, ...rest } = this.job;
    return {
      ...rest,
      progress:
        (Date.now() - this.job.startAt.getTime()) /
        (this.job.endAt.getTime() - this.job.startAt.getTime())
    };
  }

  private scheduleNext(delayMinutes?: number) {
    const interval = delayMinutes ?? this.job.intervalMinutes || this.job.intervalHours * 60;
    const delay = interval * 60 * 1000;
    this.timeout = setTimeout(() => this.execute(), delay);
  }

  private async execute() {
    if (this.job.status !== "running") return;

    const chips = [this.job.originChipId, ...this.job.targetChipIds];
    let from = chips[Math.floor(Math.random() * chips.length)];
    if (this.job.lastFrom) {
      let attempts = 0;
      while (from === this.job.lastFrom && chips.length > 1 && attempts < 10) {
        from = chips[Math.floor(Math.random() * chips.length)];
        attempts += 1;
      }
    }
    let to = chips[Math.floor(Math.random() * chips.length)];
    while (to === from && chips.length > 1) {
      to = chips[Math.floor(Math.random() * chips.length)];
    }
    const msg = this.job.conversations[this.job.currentIndex % this.job.conversations.length];
    this.job.currentIndex += 1;
    this.job.lastFrom = from;

    const whatsapp = await Whatsapp.findOne({ where: { number: from, companyId: this.job.companyId } });
    let success = false;
    let error: string | undefined;
    if (whatsapp) {
      try {
        await SendMessage(whatsapp, { number: to, body: msg, companyId: this.job.companyId });
        success = true;
      } catch (err: any) {
        error = err.message;
      }
    } else {
      error = "sender not found";
    }

    await ChipMaturationLog.create({
      chipMaturationId: this.job.id,
      fromChip: from,
      toChip: to,
      message: msg,
      success,
      error
    });

    this.job.history.push({ timestamp: new Date(), from, to, message: msg, success, error });

    if (new Date() >= this.job.endAt) {
      this.job.status = "completed";
      await ChipMaturation.update({ status: "completed" }, { where: { id: this.job.id } });
    } else {
      this.scheduleNext();
    }

    const io = getIO();
    io.of(String(this.job.companyId)).emit(`company-${this.job.companyId}-maturation`, { action: "update", record: this.serialize() });
  }

  public async cancel() {
    if (this.timeout) clearTimeout(this.timeout);
    this.job.status = "canceled";
    await ChipMaturation.update({ status: "canceled" }, { where: { id: this.job.id } });
  }

  public getData(): MaturationJob {
    return this.job;
  }
}

export default JobRunner;
