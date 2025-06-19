"use client";

export default function Functionalities() {
  const list = [
    "Departamentos e Filas",
    "Chatbot Avançado",
    "Atendimento Humano",
    "Pesquisa de Satisfação",
    "Horários Personalizáveis",
    "Tags Inteligentes",
  ];
  return (
    <section className="container mx-auto px-4 py-20 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Funcionalidades
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map((t) => (
          <div
            key={t}
            className="bg-white p-6 rounded-xl shadow flex items-start space-x-4"
          >
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center">
              ✓
            </div>
            <p className="text-gray-700">{t}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
