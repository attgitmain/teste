import ShowUserService from "../ShowUserService";
import User from "../../../models/User";

jest.mock("../../../models/User");

describe("ShowUserService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("throws ERR_NO_USER_FOUND when user does not exist", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await expect(ShowUserService(1, 1)).rejects.toThrow("ERR_NO_USER_FOUND");
  });

  it("returns user when found", async () => {
    const userData = { id: 1, companyId: 1 } as any;
    (User.findOne as jest.Mock).mockResolvedValue(userData);

    const result = await ShowUserService(1, 1);

    expect(result).toBe(userData);
  });
});
