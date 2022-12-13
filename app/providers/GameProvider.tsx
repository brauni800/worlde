'use client'
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useCountdown } from 'app/hooks'

const DEFAULT_RESPONSES = ['', '', '', '', '']
const FIVE_MINS_COUNTDOWN = 5.02 * 60 * 1000
const DEFAULT_TIMER = '00:00'

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
  pushCharacter: (char: string) => void
  resetTimer: () => void
  looseGame: () => void
  winGame: () => void
  responses: string[]
  victories: number
  games: number
  timer: string
  word: string
}

const GameContext = createContext<GameContextInterface>({
  pushCharacter: () => {},
  resetTimer: () => {},
  timer: DEFAULT_TIMER,
  startGame: () => {},
  looseGame: () => {},
  winGame: () => {},
  responses: [],
  victories: 0,
  word: '',
  games: 0
})

export const useGame = () => useContext(GameContext)

export default function GameProvider ({ children }: { children: ReactNode }) {
  const [responses, setResponses] = useState<string[]>(DEFAULT_RESPONSES)
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

  const pushCharacter = useCallback((char: string) => {
    const _responses = [...responses]

    const currentRowIndex = _responses.findIndex((row) => row.length < 5)
    if (currentRowIndex < 0) {
      setResponses(DEFAULT_RESPONSES)
      looseGame()
      return
    }

    _responses[currentRowIndex] += char

    if (_responses[currentRowIndex] === word) {
      setResponses(DEFAULT_RESPONSES)
      winGame()
      return
    }

    if (currentRowIndex === 4 && _responses[currentRowIndex].length === 5) {
      setResponses(DEFAULT_RESPONSES)
      looseGame()
      return
    }

    setResponses(_responses)
  }, [looseGame, winGame, word, responses])

  useEffect(() => {
    if (minutes + seconds <= 0) looseGame()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes, seconds])

  return (
    <GameContext.Provider
      value={{
        pushCharacter,
        resetTimer,
        startGame,
        looseGame,
        victories,
        responses,
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
