'use client'
import Image from 'next/image'

export default function Features() {
  const features = [
    {
      icon: '/globe.svg',
      title: 'Integração',
      description: 'Conecte seus canais em um único lugar.'
    },
    {
      icon: '/window.svg',
      title: 'Automação',
      description: 'Crie fluxos inteligentes e aumente a produtividade.'
    },
    {
      icon: '/file.svg',
      title: 'Relatórios',
      description: 'Analise métricas e tome decisões embasadas.'
    }
  ]

  return (
    <section className="bg-white text-gray-800 py-16 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
        {features.map((f) => (
          <div key={f.title} className="flex flex-col items-center">
            <Image src={f.icon} alt="" width={48} height={48} className="mb-4" />
            <h3 className="text-2xl font-semibold mb-2">{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
