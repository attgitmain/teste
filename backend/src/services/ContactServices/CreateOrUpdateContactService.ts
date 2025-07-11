import { getIO } from "../../libs/socket";
import CompaniesSettings from "../../models/CompaniesSettings";
import Contact from "../../models/Contact";
import ContactCustomField from "../../models/ContactCustomField";
import fs from "fs";
import path, { join } from "path";
import logger from "../../utils/logger";
import { isNil } from "lodash";
import Whatsapp from "../../models/Whatsapp";
import * as Sentry from "@sentry/node";

const axios = require("axios");

interface ExtraInfo extends ContactCustomField {
  name: string;
  value: string;
}

interface Request {
  name: string;
  number: string;
  isGroup: boolean;
  email?: string;
  matricula?: string;
  profilePicUrl?: string;
  companyId: number;
  channel?: string;
  extraInfo?: ExtraInfo[];
  remoteJid?: string;
  whatsappId?: number;
  wbot?: any;
}

const downloadProfileImage = async ({
  profilePicUrl,
  companyId,
  contact,
}: {
  profilePicUrl: string;
  companyId: number;
  contact: Contact;
}): Promise<string> => {
  const publicFolder = path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "public"
  );
  const folder = path.resolve(publicFolder, `company${companyId}`, "contacts");

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
    fs.chmodSync(folder, 0o777);
  }

  try {
    const response = await axios.get(profilePicUrl, {
      responseType: "arraybuffer",
    });

    const filename = `${Date.now()}.jpeg`;
    fs.writeFileSync(join(folder, filename), response.data);
    return filename;
  } catch (error) {
    console.error(error);
    return "";
  }
};

const CreateOrUpdateContactService = async ({
  name,
  number: rawNumber,
  profilePicUrl,
  isGroup,
  email = "",
  matricula = "",
  channel = "whatsapp",
  companyId,
  extraInfo = [],
  remoteJid = "",
  whatsappId,
  wbot,
}: Request): Promise<Contact> => {
  try {
    let createContact = false;
    const publicFolder = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "public"
    );
    const number = isGroup
      ? rawNumber
      : rawNumber.replace(/[^0-9]/g, "");
    const io = getIO();
    let contact: Contact | null;

    contact = await Contact.findOne({
      where: { number, companyId },
    });

    let updateImage =
      ((!contact ||
        (contact.profilePicUrl !== profilePicUrl &&
          profilePicUrl !== "")) &&
        !!wbot) ||
      false;

    if (contact) {
      // --- update existing ---
      contact.remoteJid = remoteJid;
      contact.profilePicUrl = profilePicUrl || null;
      contact.isGroup = isGroup;

      if (isNil(contact.whatsappId)) {
        const whatsapp = await Whatsapp.findOne({
          where: { id: whatsappId, companyId },
        });
        if (whatsapp) {
          contact.whatsappId = whatsappId;
        }
      }

      // download new picture if needed
      const folder = path.resolve(
        publicFolder,
        `company${companyId}`,
        "contacts"
      );
      let fileName = "";
      if (contact.urlPicture) {
        const oldPath = contact.urlPicture.replace(/\\/g, "/");
        fileName = path.join(folder, oldPath.split("/").pop() || "");
      }
      if (!fs.existsSync(fileName) || contact.profilePicUrl === "") {
        if (wbot && channel === "whatsapp") {
          try {
            profilePicUrl = await wbot.profilePictureUrl(
              remoteJid,
              "image"
            );
          } catch (e) {
            Sentry.captureException(e);
            profilePicUrl = `${process.env.FRONTEND_URL}/nopicture.png`;
          }
          contact.profilePicUrl = profilePicUrl;
          updateImage = true;
        }
      }

      if (contact.name === number) {
        contact.name = name;
      }

      await contact.save();
      await contact.reload();
    } else if (wbot && channel === "whatsapp") {
      // --- create new whatsapp contact ---
      const settings = await CompaniesSettings.findOne({
        where: { companyId },
      });
      const { acceptAudioMessageContact } = settings || {};
      let newRemoteJid =
        remoteJid && remoteJid !== ""
          ? remoteJid
          : isGroup
          ? `${rawNumber}@g.us`
          : `${rawNumber}@s.whatsapp.net`;

      try {
        profilePicUrl = await wbot.profilePictureUrl(
          newRemoteJid,
          "image"
        );
      } catch (e) {
        Sentry.captureException(e);
        profilePicUrl = `${process.env.FRONTEND_URL}/nopicture.png`;
      }

      contact = await Contact.create({
        name,
        number,
        email,
        matricula,
        isGroup,
        companyId,
        channel,
        acceptAudioMessage:
          acceptAudioMessageContact === "enabled",
        remoteJid: newRemoteJid,
        profilePicUrl,
        urlPicture: "",
        whatsappId,
      });

      createContact = true;
    } else if (
      ["facebook", "instagram"].includes(channel || "")
    ) {
      // --- create new social contact ---
      contact = await Contact.create({
        name,
        number,
        email,
        matricula,
        isGroup,
        companyId,
        channel,
        profilePicUrl,
        urlPicture: "",
        whatsappId,
      });
      createContact = true;
    }

    // download and attach remote image if flagged
    if (updateImage) {
      const filename = await downloadProfileImage({
        profilePicUrl: contact.profilePicUrl!,
        companyId,
        contact,
      });
      await contact.update({
        urlPicture: filename,
        pictureUpdated: true,
      });
      await contact.reload();
    }

    // emit socket event
    io.of(String(companyId)).emit(
      `company-${companyId}-contact`,
      {
        action: createContact ? "create" : "update",
        contact,
      }
    );

    return contact;
  } catch (err) {
    logger.error("Error to find or create a contact:", err);
    throw err;
  }
};

export default CreateOrUpdateContactService;
