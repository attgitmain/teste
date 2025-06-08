import Company from "../../models/Company";
import AppError from "../../errors/AppError";

const ConsumeCreditsService = async (
  companyId: number,
  amount: number
): Promise<number> => {
  const company = await Company.findByPk(companyId);
  if (!company) {
    throw new AppError("Empresa não encontrada", 404);
  }

  const balance = company.credits || 0;
  if (balance < amount) {
    throw new AppError("ERR_NO_CREDITS", 402);
  }

  const newBalance = balance - amount;
  await company.update({ credits: newBalance });
  return newBalance;
};

export default ConsumeCreditsService;
