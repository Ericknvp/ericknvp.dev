'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { type Locale, translations, type Translations } from '@/lib/i18n'

interface LangCtx {
  locale: Locale
  t: Translations
  toggle: () => void
}

const LanguageContext = createContext<LangCtx>({
  locale: 'en',
  t: translations.en,
  toggle: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale | null
    if (saved === 'en' || saved === 'es') setLocale(saved)
  }, [])

  const toggle = () => {
    setLocale((prev) => {
      const next = prev === 'en' ? 'es' : 'en'
      localStorage.setItem('locale', next)
      return next
    })
  }

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
