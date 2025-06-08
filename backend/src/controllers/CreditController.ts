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
  const balance = await AddCreditsService(companyId, amount, id);
  return res.status(200).json({ balance });
};
