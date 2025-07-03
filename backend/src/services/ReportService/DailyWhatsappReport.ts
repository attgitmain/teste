import moment from "moment";
import sequelize from "../../database";
import { QueryTypes } from "sequelize";

interface UserReport {
  name: string;
  onlineminutes: number;
  totaltickets: number;
  rating: number | null;
}

export interface DailyReportData {
  total: number;
  users: UserReport[];
}

export default async function DailyWhatsappReport(
  companyId: number,
  date: Date
): Promise<DailyReportData> {
  const start = moment(date).startOf("day").format("YYYY-MM-DD HH:mm:ss");
  const end = moment(date).endOf("day").format("YYYY-MM-DD HH:mm:ss");

  const totalQuery = `select count(*) as total from "Tickets" where "companyId" = :companyId and "createdAt" >= :start and "createdAt" <= :end`;
  const [{ total }] = (await sequelize.query(totalQuery, {
    replacements: { companyId, start, end },
    type: QueryTypes.SELECT
  })) as any;

  const userQuery = `select
      u.name,
      coalesce(sum(extract(epoch from (tt."finishedAt" - tt."startedAt")))/60,0) as onlineminutes,
      count(t.id) as totaltickets,
      round(avg(ur.rate),2) as rating
    from "Users" u
      left join "Tickets" t on t."userId" = u.id and t."companyId" = :companyId and t."createdAt" >= :start and t."createdAt" <= :end
      left join "TicketTraking" tt on tt."ticketId" = t.id and tt."companyId" = :companyId
      left join "UserRatings" ur on ur."ticketId" = t.id and ur."companyId" = :companyId
    where u."companyId" = :companyId
    group by u.id, u.name
    order by u.name`;

  const users = (await sequelize.query(userQuery, {
    replacements: { companyId, start, end },
    type: QueryTypes.SELECT
  })) as any[];

  return { total: Number(total), users };
}
