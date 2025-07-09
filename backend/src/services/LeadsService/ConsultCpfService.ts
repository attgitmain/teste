import axios from "axios";
import AppError from "../../errors/AppError";
import ConsumeCreditsService from "../CreditService/ConsumeCreditsService";

interface Request {
  cpf: string;
  companyId: number;
  free?: boolean;
}

const ConsultCpfService = async ({ cpf, companyId, free = false }: Request) => {
  const token = process.env.API_TOKEN_CPF;
  if (!token) {
    throw new AppError("Consulta por CPF em manutenção no momento", 503);
  }
  const url = `https://data.workbuscas.com/api/v1/${token}/cpf/${cpf}`;

  const REQUEST_TIMEOUT = Math.max(
    1000,
    parseInt(process.env.REQUEST_TIMEOUT_MS || "30000", 10)
  );

  const balance = await ConsumeCreditsService(companyId, free ? 0 : 3);

  try {
    const { data } = await axios.get(url, { timeout: REQUEST_TIMEOUT });
    return { data, credits: balance };
  } catch (err: any) {
    const status = err.response?.status || 500;
    const defaultMessage =
      err.code === "ECONNABORTED"
        ? "Tempo limite excedido ao consultar CPF"
        : "Erro ao consultar CPF";
    const message = err.response?.data?.message || defaultMessage;
    throw new AppError(message, status);
  }
};

export default ConsultCpfService;
