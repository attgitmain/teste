'use client'

export default function Features() {
  return (
    <section className="bg-white text-gray-800 py-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="text-2xl font-semibold mb-2">Integração</h3>
          <p>Conecte seus canais em um único lugar.</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-2">Automção</h3>
          <p>Crie fluxos inteligentes e aumente a produtividade.</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-2">Relatórios</h3>
          <p>Analise métricas e tome decisões embasadas.</p>
        </div>
      </div>
    </section>
  );
}
