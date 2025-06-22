import axios from "axios";
import LeadView from "../../models/LeadView";
import ConsumeCreditsService from "../CreditService/ConsumeCreditsService";
import AppError from "../../errors/AppError";

interface Request {
  cep: string;
  companyId: number;
  userId: number;
  page: number;
}

const PAGE_SIZE = 15;

const ConsultCepService = async ({ cep, companyId, userId, page }: Request) => {
  const token = process.env.API_TOKEN_CEP;
  if (!token) {
    throw new AppError("Consulta por CEP em manutenção no momento", 503);
  }
  const url = `https://api.dbconsultas.com/api/v1/${token}/cep/${cep}`;

  let data: any;
  try {
    ({ data } = await axios.get(url));
  } catch (err: any) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.message || "Erro ao consultar CEP";
    throw new AppError(message, status);
  }

  const allLeads = data.data || [];

  const cpfs = allLeads.map((l: any) => l.dados_pessoais.cpf);
  const viewed = await LeadView.findAll({
    where: { companyId, cpf: cpfs }
  });
  const viewedCpfs = viewed.map(v => v.cpf);

  let freshLeads = allLeads.filter(
    (l: any) => !viewedCpfs.includes(l.dados_pessoais.cpf)
  );

  if (freshLeads.length === 0 && page === 1 && allLeads.length > 0) {
    await LeadView.destroy({ where: { companyId, queryOrigin: `CEP ${cep}` } });
    freshLeads = allLeads;
  }

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
    return {
      leads: slice,
      hasMore: start + PAGE_SIZE < freshLeads.length,
      credits: balance
    };
  }

  const allShown = allLeads.length > 0;
  return {
    leads: [],
    hasMore: false,
    credits: await ConsumeCreditsService(companyId, 0),
    allShown
  };
};

export default ConsultCepService;
