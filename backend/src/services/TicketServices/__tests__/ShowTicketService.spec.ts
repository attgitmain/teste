import ShowTicketService from "../ShowTicketService";
import Ticket from "../../../models/Ticket";
import AppError from "../../../errors/AppError";

describe("ShowTicketService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("throws ERR_NO_TICKET_FOUND when ticket does not exist", async () => {
    jest.spyOn(Ticket, "findOne").mockResolvedValue(null as any);

    await expect(ShowTicketService(1, 1)).rejects.toThrow("ERR_NO_TICKET_FOUND");
  });

  it("throws when ticket belongs to another company", async () => {
    jest.spyOn(Ticket, "findOne").mockResolvedValue({ companyId: 2 } as any);

    await expect(ShowTicketService(1, 1)).rejects.toThrow(
      "Não é possível consultar registros de outra empresa"
    );
  });
});
