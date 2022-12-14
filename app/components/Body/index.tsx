'use client'
import { KeyboardEventHandler, ReactNode } from 'react'

import { useGame } from 'app/providers/GameProvider'
import { validCharacter } from 'app/hooks'

const KEYBOARD_KEY_SELECTED_COLOR = 'var(--keyboard-key-selected-color)'

const getKeyboardButton = (char: string): HTMLButtonElement | null => {
  return document.body.querySelector(`button#keyboard_key_${char?.toUpperCase()}`) as HTMLButtonElement
}

const removeButtonSelectedColor = (char: string) => {
  const button = getKeyboardButton(char)
  button?.style.removeProperty('background-color')
  button?.style.removeProperty('color')
}

const setButtonSelectedColor = (char: string) => {
  const button = getKeyboardButton(char)
  button?.style.setProperty('background-color', KEYBOARD_KEY_SELECTED_COLOR)
  button?.style.setProperty('color', '#ffffff')
}

export default function Body ({ children }: { children: ReactNode }) {
  const { pushCharacter } = useGame()

  const handleKeyDown: KeyboardEventHandler<HTMLBodyElement> = (e) => {
    const { key } = e
    const char = validCharacter(key)
    if (char) {
      setButtonSelectedColor(char)
      pushCharacter(char)
    }
  }

  const handleKeyUp: KeyboardEventHandler<HTMLBodyElement> = (e) => {
    const { key } = e
    const char = validCharacter(key)
    if (char) removeButtonSelectedColor(char)
  }

  return (
    <body
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      {children}
    </body>
  )
}
