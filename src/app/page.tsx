import Scene from '@/components/three/Scene'
import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import BentoSkills from '@/components/sections/BentoSkills'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/ui/Footer'
import MusicPlayer from '@/components/ui/MusicPlayer'

export default function Home() {
  return (
    <>
      {/* 3D background — fixed, z-index 0 */}
      <Scene />

      {/* All page content — sits above canvas via z-index 1, clips horizontal overflow */}
      <div className="relative overflow-x-hidden" style={{ zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <BentoSkills />
          <Projects />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
      <MusicPlayer />
    </>
  )
}
