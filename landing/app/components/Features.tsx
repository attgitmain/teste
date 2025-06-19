"use client";
import Image from "next/image";
import { motion } from "framer-motion";
const MotionDiv = motion.div as any;

export default function Features() {
  const items = [
    {
      icon: "/assets/globe.svg",
      title: "Integração",
      desc: "Centralize WhatsApp, Instagram e mais.",
    },
    {
      icon: "/assets/window.svg",
      title: "Automação",
      desc: "Respostas e fluxos inteligentes.",
    },
    {
      icon: "/assets/file.svg",
      title: "Relatórios",
      desc: "Métricas acionáveis em tempo real.",
    },
  ];
  return (
    <section id="features" className="container mx-auto px-4 py-20 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Principais Recursos
      </h2>
      <div className="grid sm:grid-cols-3 gap-8">
        {items.map((f, i) => (
          <MotionDiv
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl p-8 shadow-lg flex flex-col items-center text-center"
          >
            <Image
              src={f.icon}
              alt={f.title}
              width={64}
              height={64}
              className="mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}
