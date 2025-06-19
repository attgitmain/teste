"use client";
import { motion } from "framer-motion";
const MotionDiv = motion.div as any;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center text-center min-h-screen px-4"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary z-0" />
      <MotionDiv
        className="relative z-10 space-y-6 max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white">
          O CRM que fala a língua da sua empresa
        </h1>
        <p className="text-lg text-white/90">
          Automatize atendimentos, monitore em tempo real e integre seu WhatsApp com
          inteligência artificial.
        </p>
        <a
          href="#how"
          className="inline-block px-8 py-3 bg-white text-primary font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition"
        >
          Saiba Como
        </a>
      </MotionDiv>
    </section>
  );
}
