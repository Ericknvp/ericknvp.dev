import type { Metadata } from 'next'
import { Archivo, Permanent_Marker, Kalam } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/providers/LanguageProvider'
import SmoothScroll from '@/providers/SmoothScroll'
import ScrollTracker from '@/providers/ScrollTracker'
import CustomCursor from '@/components/ui/CustomCursor'

const body = Archivo({ variable: '--font-body', subsets: ['latin'], weight: ['400', '500', '600', '700'] })
const display = Permanent_Marker({ variable: '--font-display', subsets: ['latin'], weight: '400' })
const hand = Kalam({ variable: '--font-hand', subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Ericknvp - Full Stack Developer',
  description: 'Portfolio of Erick, Full Stack and Mobile Developer from Pereira, Colombia. Specializing in Flutter, Python, and web development.',
  openGraph: {
    title: 'Ericknvp - Full Stack Developer',
    description: 'Portfolio of Erick, Full Stack and Mobile Developer from Pereira, Colombia.',
    url: 'https://ericknvp-dev.vercel.app',
    siteName: 'Ericknvp',
    images: [
      {
        url: 'https://ericknvp-dev.vercel.app/avatar-erick.png',
        width: 800,
        height: 800,
        alt: 'Erick - Full Stack Developer',
      },
    ],
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} ${hand.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <LanguageProvider>
          <SmoothScroll>
            <ScrollTracker />
            <CustomCursor />
            <div className="grain-overlay" aria-hidden="true" />
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  )
}
