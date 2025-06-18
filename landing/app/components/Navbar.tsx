'use client'

export default function Navbar() {
  return (
    <nav className="absolute top-4 left-0 right-0 flex justify-between items-center px-6 z-20 text-white font-[family-name:var(--font-geist-sans)] backdrop-blur-md bg-white/10 rounded-xl mx-4 py-2">
      <span className="text-xl font-semibold">Atende Solução</span>
      <div className="space-x-4">
        <a
          href="https://app.atendesolucao.com/login"
          className="px-4 py-2 bg-white/20 backdrop-blur rounded hover:bg-white/30"
        >
          Entrar
        </a>
        <a
          href="https://app.atendesolucao.com/signup"
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Registrar
        </a>
      </div>
    </nav>
  );
}
