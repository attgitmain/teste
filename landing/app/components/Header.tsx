import Image from "next/image";

export default function Header() {
  return (
    <header className="container mx-auto py-6 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <Image src="/next.svg" width={40} height={40} alt="Logo Loopchat" />
        <span className="text-xl font-bold text-white">Loopchat</span>
      </div>
      <a
        href="#get-started"
        className="px-6 py-2 bg-white text-primary rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition"
      >
        Teste Grátis
      </a>
    </header>
  );
}
