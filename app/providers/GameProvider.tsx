'use client'
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useCountdown } from 'app/hooks'

type GameStatus = 'WON' | 'LOSE' | 'IN_PROGRESS'
const DEFAULT_RESPONSES = ['', '', '', '', '']
const FIVE_MINS_COUNTDOWN = 5.02 * 60 * 1000
export const DEFAULT_TIMER = '00:00'

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
  nextGame: () => void
  winGame: () => void
  responses: string[]
  status: GameStatus
  victories: number
  games: number
  timer: string
  word: string
}

const GameContext = createContext<GameContextInterface>({
  pushCharacter: () => {},
  status: 'IN_PROGRESS',
  resetTimer: () => {},
  timer: DEFAULT_TIMER,
  startGame: () => {},
  looseGame: () => {},
  nextGame: () => {},
  winGame: () => {},
  responses: [],
  victories: 0,
  word: '',
  games: 0
})

export const useGame = () => useContext(GameContext)

export default function GameProvider ({ children }: { children: ReactNode }) {
  const [responses, setResponses] = useState<string[]>(DEFAULT_RESPONSES)
  const [status, setStatus] = useState<GameStatus>('IN_PROGRESS')
  const [dictionary, setDictionary] = useState<string[]>([])
  const [victories, setVictories] = useState(0)
  const [games, setGames] = useState(0)
  const [word, setWord] = useState('')

  const [nowTime, setNowTime] = useState(new Date().getTime())
  const [minutes, seconds] = useCountdown(FIVE_MINS_COUNTDOWN + nowTime)
  const timer = minutes + seconds > 0 ? `${parseDigit(minutes)}:${parseDigit(seconds)}` : DEFAULT_TIMER

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
    setStatus('LOSE')
  }, [])

  const winGame = useCallback(() => {
    setVictories((prev) => prev + 1)
    setGames((prev) => prev + 1)
    setStatus('WON')
  }, [])

  const nextGame = useCallback(() => {
    setResponses(DEFAULT_RESPONSES)
    setStatus('IN_PROGRESS')
    selectRandomWord()
    resetTimer()
  }, [selectRandomWord])

  const pushCharacter = useCallback((char: string) => {
    const _responses = [...responses]

    const currentRowIndex = _responses.findIndex((row) => row.length < 5)
    if (currentRowIndex < 0) {
      looseGame()
      return
    }

    _responses[currentRowIndex] += char
    setResponses(_responses)

    if (_responses[currentRowIndex] === word) {
      winGame()
      return
    }

    if (currentRowIndex === 4 && _responses[currentRowIndex].length === 5) {
      looseGame()
    }
  }, [looseGame, winGame, word, responses])

  useEffect(() => {
    if (timer === DEFAULT_TIMER) looseGame()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer])

  return (
    <GameContext.Provider
      value={{
        pushCharacter,
        resetTimer,
        startGame,
        looseGame,
        victories,
        responses,
        nextGame,
        winGame,
        status,
        timer,
        games,
        word
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
