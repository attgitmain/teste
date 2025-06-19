"use client";

export default function HowItWorks() {
  const steps = [
    "Desenhe seu fluxo no Flow Builder",
    "Conecte canais e APIs",
    "Monitore em tempo real",
  ];
  return (
    <section id="how" className="container mx-auto px-4 py-20 bg-white">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Como Funciona
      </h2>
      <div className="grid sm:grid-cols-3 gap-8">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 flex items-center justify-center bg-primary text-white rounded-full text-xl font-bold">
              {i + 1}
            </div>
            <p className="text-gray-600 text-center">{s}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
