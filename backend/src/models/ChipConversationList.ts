import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
  DataType
} from "sequelize-typescript";

@Table
class ChipConversationList extends Model<ChipConversationList> {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column
  name: string;

  @Column(DataType.JSONB)
  messages: string[];

  @Column
  companyId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}

export default ChipConversationList;
