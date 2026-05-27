import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/providers/ThemeProvider'
import ColorProvider from '@/providers/ColorProvider'
import { LanguageProvider } from '@/providers/LanguageProvider'
import SmoothScroll from '@/providers/SmoothScroll'
import ScrollTracker from '@/providers/ScrollTracker'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ThemeProvider>
          <ColorProvider>
          <LanguageProvider>
            <SmoothScroll>
              <ScrollTracker />
              {children}
            </SmoothScroll>
          </LanguageProvider>
          </ColorProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
