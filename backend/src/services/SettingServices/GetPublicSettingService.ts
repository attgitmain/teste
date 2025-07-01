import Setting from "../../models/Setting";

const publicSettingsKeys = [
  "allowSignup",
  "primaryColorLight",
  "primaryColorDark",
  "appLogoLight",
  "appLogoDark",
  "appLogoFavicon",
  "appName"
] as const;

type PublicSettingKey = typeof publicSettingsKeys[number];

interface Request {
  key: string;
}

const GetPublicSettingService = async ({ key }: Request): Promise<string | undefined> => {
  if (!publicSettingsKeys.includes(key as PublicSettingKey)) return undefined;

  try {
    const setting = await Setting.findOne({
      where: {
        companyId: 1,
        key
      }
    });

    return setting?.value;
  } catch (error) {
    console.error(`Erro ao buscar a configuração pública: ${key}`, error);
    return undefined;
  }
};

export default GetPublicSettingService;
