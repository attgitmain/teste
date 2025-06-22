import { Request, Response } from "express";

import ConsultCepService from "../services/LeadsService/ConsultCepService";
import ConsultCpfService from "../services/LeadsService/ConsultCpfService";

export const consultCep = async (req: Request, res: Response): Promise<Response> => {
  const { cep } = req.params;
  const { companyId, id } = req.user;
  const page = parseInt(req.query.page as string) || 1;

  const result = await ConsultCepService({
    cep,
    companyId,
    userId: parseInt(id),
    page
  });

  return res.status(200).json(result);
};

export const consultCpf = async (req: Request, res: Response): Promise<Response> => {
  const { cpf } = req.params;
  const { companyId } = req.user;
  const fromCep = req.query.from === "cep";

  const result = await ConsultCpfService({ cpf, companyId, free: fromCep });
  return res.status(200).json(result);
};
