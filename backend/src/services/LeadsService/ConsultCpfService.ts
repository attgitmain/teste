import axios from "axios";
import ConsumeCreditsService from "../CreditService/ConsumeCreditsService";

interface Request {
  cpf: string;
  companyId: number;
}

const ConsultCpfService = async ({ cpf, companyId }: Request) => {
  const token = process.env.API_TOKEN_CPF;
  const url = `https://api.dbconsultas.com/api/v1/${token}/cpf/${cpf}`;

  const balance = await ConsumeCreditsService(companyId, 3);
  const { data } = await axios.get(url);

  return { data, credits: balance };
};

export default ConsultCpfService;
