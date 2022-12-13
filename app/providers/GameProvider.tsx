'use client'
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useCountdown } from 'app/hooks'

const FIVE_MINS_COUNTDOWN = 5.02 * 60 * 1000

const parseDigit = (digit: number) => {
  return digit.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
}

const getRandomWord = (dictionary: string[]) => {
  const wordIndex = Math.floor(Math.random() * (dictionary.length - 1))
  const word = dictionary.at(wordIndex)
  return { word, wordIndex }
}

const parseWord = (word: string) => {
  return word.normalize('NFD').replace(/\p{Diacritic}/gu, '')
}

export interface GameContextInterface {
  startGame: ({ dictionary }: { dictionary: string[] }) => void
  resetTimer: () => void
  looseGame: () => void
  winGame: () => void
  victories: number
  games: number
  timer: string
  word: string
}

const GameContext = createContext<GameContextInterface>({
  resetTimer: () => {},
  startGame: () => {},
  looseGame: () => {},
  winGame: () => {},
  timer: '00:00',
  victories: 0,
  word: '',
  games: 0
})

export const useGame = () => useContext(GameContext)

export default function GameProvider ({ children }: { children: ReactNode }) {
  const [dictionary, setDictionary] = useState<string[]>([])
  const [victories, setVictories] = useState(0)
  const [games, setGames] = useState(0)
  const [word, setWord] = useState('')

  const [nowTime, setNowTime] = useState(new Date().getTime())
  const [minutes, seconds] = useCountdown(FIVE_MINS_COUNTDOWN + nowTime)
  const timer = `${parseDigit(minutes)}:${parseDigit(seconds)}`

  const selectRandomWord = useCallback(() => {
    const { word, wordIndex } = getRandomWord(dictionary)
    if (word) {
      setWord(parseWord(word))
      setDictionary((prev) => prev.filter((w, i) => i !== wordIndex))
    }
  }, [dictionary])

  const startGame = useCallback(({ dictionary }: { dictionary: string[] }) => {
    const { word, wordIndex } = getRandomWord(dictionary)
    if (word) {
      const _word = parseWord(word)
      setWord(_word)
      setDictionary(dictionary.filter((w, i) => i !== wordIndex))
    }
  }, [])

  const resetTimer = () => {
    setNowTime(new Date().getTime())
  }

  const looseGame = useCallback(() => {
    setGames((prev) => prev + 1)
    selectRandomWord()
    resetTimer()
  }, [selectRandomWord])

  const winGame = useCallback(() => {
    setVictories((prev) => prev + 1)
    setGames((prev) => prev + 1)
    selectRandomWord()
    resetTimer()
  }, [selectRandomWord])

  useEffect(() => {
    if (minutes + seconds <= 0) looseGame()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes, seconds])

  return (
    <GameContext.Provider
      value={{
        resetTimer,
        startGame,
        looseGame,
        victories,
        winGame,
        timer,
        games,
        word
      }}
    >
      {children}
    </GameContext.Provider>
  )
}