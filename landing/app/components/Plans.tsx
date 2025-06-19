"use client";

export default function Plans() {
  const plans = [
    {
      name: "Light",
      price: "R$249,90",
      features: ["1 WhatsApp", "3 Atendentes", "Flow Builder"],
    },
    {
      name: "Master",
      price: "R$429,90",
      features: ["2 WhatsApp", "7 Atendentes", "Integrações API"],
    },
    {
      name: "Diamante",
      price: "R$689,90",
      features: ["3 WhatsApp", "20 Atendentes", "API Oficial WhatsApp"],
    },
  ];
  return (
    <section id="plans" className="container mx-auto px-4 py-20 bg-white">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Planos</h2>
      <div className="grid sm:grid-cols-3 gap-8">
        {plans.map((p) => (
          <div
            key={p.name}
            className="bg-gray-50 rounded-2xl p-8 shadow-lg flex flex-col"
          >
            <h3 className="text-2xl font-bold mb-2 text-primary">{p.name}</h3>
            <p className="inline-block mb-4 px-4 py-1 bg-secondary text-white rounded-full text-sm">
              Mensal
            </p>
            <p className="text-3xl font-extrabold mb-6 text-gray-800">{p.price}</p>
            <ul className="flex-1 space-y-2 mb-6 text-gray-600">
              {p.features.map((f) => (
                <li key={f} className="border-b pb-2">
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#get-started"
              className="mt-auto px-6 py-3 bg-accent text-white text-center rounded-full shadow hover:shadow-xl transition"
            >
              Teste grátis 3 dias!
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
