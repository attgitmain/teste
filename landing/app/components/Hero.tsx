'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center text-white font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-500 to-blue-400" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-30" />
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl sm:text-6xl font-bold mb-6 z-10"
      >
        Bem-vindo ao Atende Solução
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-xl max-w-2xl z-10"
      >
        A plataforma completa para atendimento e autómação de conversas.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-8 z-10"
      >
        <a
          href="https://app.atendesolucao.com/signup"
          className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700"
        >
          Comece agora
        </a>
      </motion.div>
    </section>
  )
}
