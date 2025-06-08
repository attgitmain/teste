import { Request, Response } from "express";
import axios from "axios";
import ConsumeCreditsService from "../services/CreditService/ConsumeCreditsService";

export const consultCep = async (req: Request, res: Response): Promise<Response> => {
  const { cep } = req.params;
  const { companyId } = req.user;

  const balance = await ConsumeCreditsService(companyId, 1);

  const token = process.env.API_TOKEN_CEP;
  const url = `https://api.dbconsultas.com/api/v1/${token}/cep/${cep}`;
  const { data } = await axios.get(url);

  return res.status(200).json({ ...data, credits: balance });
};
