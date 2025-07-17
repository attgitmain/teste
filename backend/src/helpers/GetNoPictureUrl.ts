import axios from "axios";

const GetNoPictureUrl = async (): Promise<string> => {
  const urls = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',').map(u => u.trim()).filter(Boolean)
    : [];

  for (const url of urls) {
    try {
      await axios.head(`${url}/nopicture.png`);
      return `${url}/nopicture.png`;
    } catch (err) {
      // Try next URL
    }
  }

  return urls.length ? `${urls[0]}/nopicture.png` : "/nopicture.png";
};

export default GetNoPictureUrl;
