'use client'

import { useTheme } from 'app/providers/ThemeProvider'

export default function ThemeButton () {
  const { theme, toggleTheme } = useTheme()

  const handleClick = () => {
    toggleTheme()
  }

  return (
    <button onClick={handleClick}>
      {theme}
    </button>
  )
}
