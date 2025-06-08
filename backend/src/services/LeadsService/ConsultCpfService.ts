import axios from "axios";
import AppError from "../../errors/AppError";
import ConsumeCreditsService from "../CreditService/ConsumeCreditsService";

interface Request {
  cpf: string;
  companyId: number;
}

const ConsultCpfService = async ({ cpf, companyId }: Request) => {
  const token = process.env.API_TOKEN_CPF;
  if (!token) {
    throw new AppError(
      "Consulta por CPF em manutenção no momento",
      503
    );
  }
  const url = `https://api.dbconsultas.com/api/v1/${token}/datalinkcpf/${cpf}`;

  const balance = await ConsumeCreditsService(companyId, 3);

  try {
    const { data } = await axios.get(url);
    return { data, credits: balance };
  } catch (err: any) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.message || "Erro ao consultar CPF";
    throw new AppError(message, status);
  }
};

export default ConsultCpfService;
