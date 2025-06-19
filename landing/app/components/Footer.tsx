"use client";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-10">
      <div className="container mx-auto px-4 text-center space-y-4">
        <p>© {new Date().getFullYear()} Loopchat. Todos os direitos reservados.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">Termos</a>
          <a href="#" className="hover:underline">Privacidade</a>
          <a href="#" className="hover:underline">Contato</a>
        </div>
      </div>
    </footer>
  );
}
