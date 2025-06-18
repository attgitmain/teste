'use client'

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 text-center py-6 text-sm font-sans">
      <p>&copy; {new Date().getFullYear()} Atende Solução. Todos os direitos reservados.</p>
    </footer>
  );
}
