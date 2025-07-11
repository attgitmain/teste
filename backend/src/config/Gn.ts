import path from "path";

const getGnConfig = () => {
  const cert = process.env.GERENCIANET_PIX_CERT
    ? path.resolve(process.env.GERENCIANET_PIX_CERT)
    : "";

  return {
    sandbox: process.env.GERENCIANET_SANDBOX === "true",
    client_id: process.env.GERENCIANET_CLIENT_ID as string,
    client_secret: process.env.GERENCIANET_CLIENT_SECRET as string,
    pix_cert: cert
  };
};

export default getGnConfig;

