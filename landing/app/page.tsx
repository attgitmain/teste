"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto flex flex-col-reverse md:flex-row items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-white space-y-4 text-center md:text-left"
        >
          <h1 className="text-5xl font-extrabold">
            O CRM que fala a língua da sua empresa
          </h1>
          <p className="text-lg max-w-md">
            Automatize atendimentos, monitore em tempo real e integre seu WhatsApp
          </p>
          <a
            id="get-started"
            href="#"
            className="inline-block bg-accent text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition"
          >
            Comece Agora
          </a>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mb-8 md:mb-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80"
            width={500}
            height={400}
            alt="Dashboard Loopchat"
            className="rounded-xl shadow-xl"
          />
        </motion.div>
      </main>

      <section className="container mx-auto py-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-white">
        {[
          ["📈", "Analytics em Tempo Real", "Dashboards interativos na palma da mão."],
          ["🤖", "Automação Inteligente", "Fluxos que respondem sozinhos aos seus clientes."],
          ["💬", "Integração WhatsApp", "Todos os chats num único lugar."],
        ].map(([icon, title, desc], i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
          >
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-sm">{desc}</p>
          </motion.div>
        ))}
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
