'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export type ThemeType = 'light' | 'dark'

export interface ThemeContextState {
  toggleTheme: () => void
  theme: ThemeType
}

const DARK_CLASS_NAME = 'dark'

const ThemeContext = createContext<ThemeContextState>({ theme: 'light', toggleTheme: () => {} })

export const useTheme = () => useContext(ThemeContext)

export default function ThemeProvider ({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('light')

  const toggleTheme = () => {
    setTheme((prevState) => {
      const mode: ThemeType = prevState === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', mode)
      return mode
    })
  }

  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    if (localTheme) setTheme(localTheme as ThemeType)
  }, [])

  useEffect(() => {
    const html = document.querySelector('html')!
    if (theme === 'dark') html.classList.add(DARK_CLASS_NAME)
    else html.classList.remove(DARK_CLASS_NAME)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
