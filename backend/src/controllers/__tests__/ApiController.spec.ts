import { checkNumber } from "../ApiController";
import Whatsapp from "../../models/Whatsapp";
import GetDefaultWhatsApp from "../../helpers/GetDefaultWhatsApp";
import { getWbot } from "../../libs/wbot";

jest.mock("../../models/Whatsapp");
jest.mock("../../helpers/GetDefaultWhatsApp");
jest.mock("../../libs/wbot", () => ({ getWbot: jest.fn() }));

describe("ApiController checkNumber", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns 200 when number exists", async () => {
    const req: any = {
      body: { number: "5511999999999" },
      headers: { authorization: "Bearer token" }
    };
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const res: any = { status };

    (Whatsapp.findOne as jest.Mock).mockResolvedValue({ id: 1, companyId: 1 });
    (GetDefaultWhatsApp as jest.Mock).mockResolvedValue({ id: 1 });
    (getWbot as jest.Mock).mockReturnValue({
      onWhatsApp: jest.fn().mockResolvedValue([{ exists: true, jid: "5511999999999@s.whatsapp.net" }])
    });

    await checkNumber(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      existsInWhatsapp: true,
      number: "5511999999999",
      numberFormatted: "5511999999999@s.whatsapp.net"
    });
  });

  it("returns 400 when number is invalid", async () => {
    const req: any = {
      body: { number: "5511999999999" },
      headers: { authorization: "Bearer token" }
    };
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const res: any = { status };

    (Whatsapp.findOne as jest.Mock).mockResolvedValue({ id: 1, companyId: 1 });
    (GetDefaultWhatsApp as jest.Mock).mockResolvedValue({ id: 1 });
    (getWbot as jest.Mock).mockReturnValue({
      onWhatsApp: jest.fn().mockRejectedValue(new Error("fail"))
    });

    await checkNumber(req, res);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      existsInWhatsapp: false,
      number: "5511999999999@s.whatsapp.net",
      error: "Not exists on Whatsapp"
    });
  });
});
