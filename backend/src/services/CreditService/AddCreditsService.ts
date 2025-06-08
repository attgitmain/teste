import Company from "../../models/Company";
import User from "../../models/User";
import AppError from "../../errors/AppError";

const AddCreditsService = async (
  companyId: number,
  amount: number,
  userId: number
): Promise<number> => {
  const user = await User.findByPk(userId);
  if (!user || !user.super) {
    throw new AppError("Acesso não permitido", 401);
  }

  const company = await Company.findByPk(companyId);
  if (!company) {
    throw new AppError("Empresa não encontrada", 404);
  }

  const newBalance = (company.credits || 0) + amount;
  await company.update({ credits: newBalance });

  return newBalance;
};

export default AddCreditsService;
