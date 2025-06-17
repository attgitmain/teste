'use client'

import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="relative min-h-screen text-white font-[family-name:var(--font-geist-sans)]">
      <div
        className="absolute inset-0 bg-cover bg-center" 
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80')"}}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <header className="absolute top-4 right-4 z-10 space-x-4">
        <a href="https://app.atendesolucao.com/login" className="px-4 py-2 bg-white/20 backdrop-blur rounded hover:bg-white/30">Entrar</a>
        <a href="https://app.atendesolucao.com/signup" className="px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-700">Registrar</a>
      </header>
      <main className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl font-bold mb-6"
        >
          Bem-vindo ao Atende Solução
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl max-w-2xl"
        >
          A plataforma completa para atendimento e automação de conversas.
        </motion.p>
      </main>
      <section className="bg-white text-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Integração</h3>
            <p>Conecte seus canais em um único lugar.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">Automação</h3>
            <p>Crie fluxos inteligentes e aumente a produtividade.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">Relatórios</h3>
            <p>Analise métricas e tome decisões embasadas.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
