import Company from "../../models/Company";

const GetCreditBalanceService = async (companyId: number): Promise<number> => {
  const company = await Company.findByPk(companyId);
  if (!company) return 0;
  return company.credits || 0;
};

export default GetCreditBalanceService;
