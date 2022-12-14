'use client'
import { KeyboardEventHandler, ReactNode } from 'react'

import { useGame } from 'app/providers/GameProvider'
import { validCharacter } from 'app/hooks'

export default function Body ({ children }: { children: ReactNode }) {
  const { pushCharacter } = useGame()

  const handleKeyDown: KeyboardEventHandler<HTMLBodyElement> = (e) => {
    const { key } = e
    const char = validCharacter(key)
    if (char) pushCharacter(char)
  }

  return (
    <body onKeyDown={handleKeyDown}>
      {children}
    </body>
  )
}
