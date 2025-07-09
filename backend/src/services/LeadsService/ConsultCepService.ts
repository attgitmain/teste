import axios from "axios";
import pLimit from "p-limit";
import LeadView from "../../models/LeadView";
import ConsumeCreditsService from "../CreditService/ConsumeCreditsService";
import AppError from "../../errors/AppError";
import ConsultCpfService from "./ConsultCpfService";

interface Request {
  cep: string;
  companyId: number;
  userId: number;
  page: number;
}

const PAGE_SIZE = Math.max(
  1,
  parseInt(process.env.LEADS_PAGE_SIZE || "25", 10)
);
const CONCURRENCY = Math.max(
  1,
  parseInt(process.env.LEADS_CONCURRENCY || "5", 10)
);
const limit = pLimit(CONCURRENCY);
const REQUEST_TIMEOUT = Math.max(
  1000,
  // Tempo limite para as requisições à Work API (padrão 90 segundos)
  parseInt(process.env.REQUEST_TIMEOUT_MS || "90000", 10)
);

const ConsultCepService = async ({ cep, companyId, userId, page }: Request) => {
  const token = process.env.API_TOKEN_CEP;
  if (!token) {
    console.log("🚫 Token da API não encontrado.");
    throw new AppError("Consulta por CEP em manutenção no momento", 503);
  }
  const url = `https://data.workbuscas.com/api/v1/${token}/cep/${cep}`;
  console.log(`🌐 Consultando Work API com URL: ${url}`);

  let data: any;
  try {
    const res = await axios.get(url, { timeout: REQUEST_TIMEOUT });
    data = res.data;
    console.log(
      `✅ Dados recebidos da Work API. Total de leads: ${
        data?.data?.length || 0
      }`
    );
  } catch (err: any) {
    const status = err.response?.status || 500;
    const defaultMessage =
      err.code === "ECONNABORTED"
        ? "Tempo limite excedido ao consultar CEP"
        : "Erro ao consultar CEP";
    const message = err.response?.data?.message || defaultMessage;
    console.error(
      "❌ Erro ao consultar Work API:",
      message,
      err.code || "",
      status
    );
    throw new AppError(message, status);
  }

  const allLeads = data.data || [];

  const cpfs = allLeads.map((l: any) => l.dados_pessoais.cpf);
  console.log(`🧮 Total de CPFs extraídos: ${cpfs.length}`);
  const viewed = await LeadView.findAll({
    where: { companyId, cpf: cpfs }
  });
  const viewedCpfs = viewed.map(v => v.cpf);

  let freshLeads = allLeads.filter(
    (l: any) => !viewedCpfs.includes(l.dados_pessoais.cpf)
  );

  if (freshLeads.length === 0 && page === 1 && allLeads.length > 0) {
    console.log("🔁 Resetando visualizações pois todos já foram vistos.");
    await LeadView.destroy({ where: { companyId, queryOrigin: `CEP ${cep}` } });
    freshLeads = allLeads;
  }

  const start = (page - 1) * PAGE_SIZE;
  const slice = freshLeads.slice(start, start + PAGE_SIZE);
  console.log(`📦 Página ${page}: ${slice.length} leads para retornar.`);

  if (slice.length > 0) {
    console.log(`💳 Consumindo crédito para a empresa ${companyId}`);
    const balance = await ConsumeCreditsService(companyId, 1);

    // Enrich each lead with phone numbers from CPF lookup
    await Promise.all(
      slice.map(lead =>
        limit(async () => {
          try {
            console.log(`🔍 Buscando telefones do CPF: ${lead.dados_pessoais.cpf}`);
            const { data } = await ConsultCpfService({
              cpf: lead.dados_pessoais.cpf,
              companyId,
              free: true
            });
            const detail = data?.data || data;
            let phones: any[] = [];
            if (Array.isArray(detail.telefones)) {
              phones = detail.telefones.map((tel: any) => ({
                numero: tel.numero || tel.telefone || "",
                tipo: tel.tipo || tel.operadora || "",
                whatsapp: tel.whatsapp || false
              }));
            }
            if (Array.isArray(detail.celulares)) {
              phones = phones.concat(
                detail.celulares.map((c: any) => ({
                  numero: c,
                  tipo: "Celular"
                }))
              );
            }
            if (!phones.length && detail.telefone) {
              phones.push({ numero: detail.telefone, tipo: "Fixo" });
            }
            lead.telefones = phones;
          } catch (err) {
            console.warn(`⚠️ Falha ao buscar telefones para CPF: ${lead.dados_pessoais.cpf}`);
            lead.telefones = [];
          }
        })
      )
    );

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

  console.log("🚫 Nenhum lead novo a mostrar.");
  const allShown = allLeads.length > 0;
  return {
    leads: [],
    hasMore: false,
    credits: await ConsumeCreditsService(companyId, 0),
    allShown
  };
};

export default ConsultCepService;
