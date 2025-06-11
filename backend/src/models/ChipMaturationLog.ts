import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  DataType
} from "sequelize-typescript";
import ChipMaturation from "./ChipMaturation";

@Table
class ChipMaturationLog extends Model<ChipMaturationLog> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => ChipMaturation)
  @Column(DataType.UUID)
  chipMaturationId: string;

  @BelongsTo(() => ChipMaturation)
  chipMaturation: ChipMaturation;

  @Column
  fromChip: string;

  @Column
  toChip: string;

  @Column(DataType.TEXT)
  message: string;

  @Column
  success: boolean;

  @Column(DataType.TEXT)
  error: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}

export default ChipMaturationLog;
