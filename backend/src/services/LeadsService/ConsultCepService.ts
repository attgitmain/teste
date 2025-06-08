import axios from "axios";
import LeadView from "../../models/LeadView";
import ConsumeCreditsService from "../CreditService/ConsumeCreditsService";

interface Request {
  cep: string;
  companyId: number;
  userId: number;
  page: number;
}

const PAGE_SIZE = 15;

const ConsultCepService = async ({ cep, companyId, userId, page }: Request) => {
  const token = process.env.API_TOKEN_CEP;
  const url = `https://api.dbconsultas.com/api/v1/${token}/cep/${cep}`;
  const { data } = await axios.get(url);
  const allLeads = data.data || [];

  const cpfs = allLeads.map((l: any) => l.dados_pessoais.cpf);
  const viewed = await LeadView.findAll({
    where: { companyId, cpf: cpfs }
  });
  const viewedCpfs = viewed.map(v => v.cpf);

  const freshLeads = allLeads.filter(
    (l: any) => !viewedCpfs.includes(l.dados_pessoais.cpf)
  );

  const start = (page - 1) * PAGE_SIZE;
  const slice = freshLeads.slice(start, start + PAGE_SIZE);

  if (slice.length > 0) {
    const balance = await ConsumeCreditsService(companyId, 1);
    await LeadView.bulkCreate(
      slice.map((l: any) => ({
        companyId,
        userId,
        cpf: l.dados_pessoais.cpf,
        queryOrigin: `CEP ${cep}`
      }))
    );
    return { leads: slice, hasMore: start + PAGE_SIZE < freshLeads.length, credits: balance };
  }

  return { leads: [], hasMore: false, credits: await ConsumeCreditsService(companyId, 0) };
};

export default ConsultCepService;
