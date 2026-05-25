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
  title: 'Erick NVP — Full Stack Developer',
  description: 'Portfolio of Erick, Full Stack Developer specializing in React, Next.js, and Node.js.',
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
