import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
  DataType,
  HasMany
} from "sequelize-typescript";
import ChipMaturationLog from "./ChipMaturationLog";

@Table
class ChipMaturation extends Model<ChipMaturation> {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column
  originChipId: string;

  @Column({ type: DataType.JSONB })
  targetChipIds: string[];

  @Column
  days: number;

  @Column
  intervalHours: number;

  @Column({ type: DataType.JSONB })
  conversations: string[];

  @Column
  startAt: Date;

  @Column
  endAt: Date;

  @Column
  status: string;

  @Column
  companyId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => ChipMaturationLog)
  logs: ChipMaturationLog[];
}

export default ChipMaturation;
