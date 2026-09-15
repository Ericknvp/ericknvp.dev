'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface StoreShotSlideshowProps {
  images: string[]
  intervalMs?: number
}

export default function StoreShotSlideshow({ images, intervalMs = 3200 }: StoreShotSlideshowProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    const id = setInterval(() => setIndex(i => (i + 1) % images.length), intervalMs)
    return () => clearInterval(id)
  }, [images.length, intervalMs])

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Ambient blurred backdrop echoing the active shot */}
          <Image
            src={images[index]}
            alt=""
            fill
            aria-hidden="true"
            className="object-cover scale-125 opacity-50 blur-2xl"
          />

          <div
            className="relative shrink-0"
            style={{
              width: 'clamp(140px, 30vw, 200px)',
              aspectRatio: '9 / 16',
              borderRadius: 18,
              overflow: 'hidden',
              border: '3px solid var(--ink)',
              boxShadow: '0 24px 44px -14px rgba(var(--shadow-c), 0.6)',
            }}
          >
            <Image src={images[index]} alt="Monedo store screenshot" fill className="object-cover" />
          </div>
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Screenshot ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === index ? 16 : 6,
                height: 6,
                background: i === index ? 'var(--paper)' : 'rgba(251,243,223,0.45)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
