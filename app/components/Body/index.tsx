'use client'
import { KeyboardEventHandler, ReactNode } from 'react'

import { useGame } from 'app/providers/GameProvider'

const IS_CAPITAL_LETTER = (x: number) => x >= 65 && x <= 90
const IS_LOWERCASE_LETTER = (x: number) => x >= 97 && x <= 122
const IS_LETTER_ENYE = (x: number) => x === 209 || x === 241

export default function Body ({ children }: { children: ReactNode }) {
  const { pushCharacter } = useGame()

  const handleKeyDown: KeyboardEventHandler<HTMLBodyElement> = (e) => {
    const { key } = e
    if (key.length === 1) {
      const ascii = key.charCodeAt(0)
      if (IS_CAPITAL_LETTER(ascii) || IS_LOWERCASE_LETTER(ascii) || IS_LETTER_ENYE(ascii)) {
        pushCharacter(key)
      }
    }
  }

  return (
    <body onKeyDown={handleKeyDown}>
      {children}
    </body>
  )
}
