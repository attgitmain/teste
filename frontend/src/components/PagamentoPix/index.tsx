import { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";

export default function PagamentoPix() {
  const [qr, setQr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const gerarQrCode = async () => {
    console.info("Solicitando QR Code PIX");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/subscription`,
        { price: 2 },
        { withCredentials: true }
      );
      console.info("QR Code gerado com sucesso");
      setQr(data.qr);
    } catch (err) {
      console.error("Erro ao gerar QR:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={gerarQrCode} disabled={loading}>
        {loading ? "Gerando..." : "Pagar com Pix"}
      </button>

      {qr && (
        <div style={{ marginTop: 20 }}>
          <QRCode value={qr} size={200} />
          <p>Escaneie para pagar</p>
        </div>
      )}
    </div>
  );
}
