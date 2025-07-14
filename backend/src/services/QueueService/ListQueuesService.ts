import Queue from "../../models/Queue";
import Prompt from "../../models/Prompt";

interface Request {
  companyId: number;
}

const ListQueuesService = async ({ companyId }: Request): Promise<Queue[]> => {
  const queues = await Queue.findAll({
    where: {
      companyId
    },
    include: [
      {
        model: Prompt,
        as: "promptSelected"
      }
    ],
    order: [["orderQueue", "ASC"]],
  });

  return queues;
};

export default ListQueuesService;
