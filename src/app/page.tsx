import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import BentoSkills from '@/components/sections/BentoSkills'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/ui/Footer'
import MusicPlayer from '@/components/ui/MusicPlayer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <Projects />
        <BentoSkills />
        <About />
        <Contact />
      </main>
      <Footer />
      <MusicPlayer />
    </>
  )
}
