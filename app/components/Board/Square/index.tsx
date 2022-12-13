import { ReactNode } from 'react'

import { useGame } from 'app/providers/GameProvider'

import styles from './index.module.css'

const COLOR_DEFAULT = 'var(--disabled-color)'
const COLOR_SUCCESS = 'var(--success-color)'
const COLOR_WARNING = 'var(--warning-color)'

export default function Square ({ children, index }: { children: ReactNode, index: number }) {
  const { word } = useGame()

  const getColor = () => {
    if (children) {
      const char = children.toString()
      if (char === word.at(index)) return COLOR_SUCCESS
      if (word.includes(char)) return COLOR_WARNING
      return COLOR_DEFAULT
    }
    return undefined
  }

  return (
    <div
      className={styles.square}
      style={{
        backgroundColor: getColor()
      }}
    >
      {children}
    </div>
  )
}
