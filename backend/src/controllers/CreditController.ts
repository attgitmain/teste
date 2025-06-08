import { Request, Response } from "express";
import GetCreditBalanceService from "../services/CreditService/GetCreditBalanceService";
import AddCreditsService from "../services/CreditService/AddCreditsService";

export const getBalance = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const balance = await GetCreditBalanceService(companyId);
  return res.status(200).json({ balance });
};

export const addCredits = async (req: Request, res: Response): Promise<Response> => {
  const { amount, companyId } = req.body;
  const { id } = req.user;

  const parsedAmount = Number(amount);
  const parsedCompanyId = Number(companyId);

  if (isNaN(parsedAmount) || isNaN(parsedCompanyId)) {
    return res.status(400).json({ error: "Parâmetros inválidos" });
  }

  const balance = await AddCreditsService(parsedCompanyId, parsedAmount, id);
  return res.status(200).json({ balance });
};
