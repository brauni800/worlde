'use client'

import { useId } from 'react'

import { useTheme } from 'app/providers/ThemeProvider'
import styles from './index.module.css'

export default function ThemeButton ({ size = 1 }) {
  const { theme, toggleTheme } = useTheme()
  const inputId = useId()

  const onChange = () => {
    toggleTheme()
  }

  return (
    <div className={styles.container}>
      <input id={inputId} type='checkbox' checked={theme === 'light'} onChange={onChange} />
      <label htmlFor={inputId} style={{ width: `${size * 2}rem`, height: `calc(${size}rem + 4px)` }}>
        <span style={{ width: `${size}rem`, height: `${size}rem` }} />
      </label>
    </div>
  )
}
