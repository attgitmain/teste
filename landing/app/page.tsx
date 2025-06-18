import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Features from './components/Features'
import CTA from './components/CTA'
import Footer from './components/Footer'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  )
}
