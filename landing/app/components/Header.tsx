"use client";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-secondary">Loopchat</span>
        <nav className="flex items-center space-x-6">
          <a href="#hero" className="text-gray-800 hover:text-primary">Início</a>
          <a href="#how" className="text-gray-800 hover:text-primary">Como Funciona</a>
          <a href="#plans" className="text-gray-800 hover:text-primary">Planos</a>
          <a href="#features" className="text-gray-800 hover:text-primary">Recursos</a>
          <a
            href="#get-started"
            className="px-6 py-2 bg-accent text-white rounded-full hover:opacity-90 transition"
          >
            Teste Grátis
          </a>
        </nav>
      </div>
    </header>
  );
}
