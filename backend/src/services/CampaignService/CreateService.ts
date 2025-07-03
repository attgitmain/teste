import * as Yup from "yup";
import AppError from "../../errors/AppError";
import Campaign from "../../models/Campaign";
import ContactList from "../../models/ContactList";
import Whatsapp from "../../models/Whatsapp";
import User from "../../models/User";
import Queue from "../../models/Queue";
import { ICampaignData } from "../../@types/Campaign";



const CreateService = async (data: ICampaignData): Promise<Campaign> => {
  const { name } = data;

  const ticketnoteSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "ERR_CAMPAIGN_INVALID_NAME")
      .required("ERR_CAMPAIGN_REQUIRED")
  });

  try {
    await ticketnoteSchema.validate({ name });
  } catch (err: any) {
    throw new AppError(err.message);
  }

  const contactList = await ContactList.findOne({
    where: { id: data.contactListId, companyId: data.companyId }
  });

  if (!contactList) {
    throw new AppError("ERR_NO_CONTACTLIST_FOUND", 404);
  }


  const record = await Campaign.create(data);

  await record.reload({
    include: [
      { model: ContactList },
      { model: Whatsapp, attributes: ["id", "name"] },
      { model: User, attributes: ["id", "name"] },
      { model: Queue, attributes: ["id", "name"] },
        ]
  });

  return record;
};

export default CreateService;
