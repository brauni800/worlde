'use client'
import { MouseEventHandler, ReactNode } from 'react'

import { useGame } from 'app/providers/GameProvider'
import { validCharacter } from 'app/hooks'

import BackspaceSVG from 'public/svg/backspace.svg'
import styles from './index.module.css'

const Icon = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.icon}>
      {children}
    </div>
  )
}

export default function Key ({ children }: { children: ReactNode }) {
  const { pushCharacter } = useGame()
  const char = children?.toString()

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (char) {
      const validChar = validCharacter(char)
      if (validChar) pushCharacter(validChar)
    }
  }

  return (
    <button className={styles.button} onClick={handleClick}>
      {char === 'BACKSPACE'
        ? <Icon><BackspaceSVG /></Icon>
        : char}
    </button>
  )
}
