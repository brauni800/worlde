'use client'
import { useState, useEffect, useRef } from 'react'

export function useMountTransition (isMounted: boolean, unmountDelay: number) {
  const [hasTransitionedIn, setHasTransitionedIn] = useState(false)

  useEffect(() => {
    let timeoutId: any

    if (isMounted && !hasTransitionedIn) {
      setHasTransitionedIn(true)
    } else if (!isMounted && hasTransitionedIn) {
      timeoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [unmountDelay, isMounted, hasTransitionedIn])

  return hasTransitionedIn
}

export function useOutsideClick (callback: () => void) {
  const ref = useRef<any>()

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [ref, callback])

  return ref
}

export const useCountdown = (targetDate: string | number | Date) => {
  const countdownDate = new Date(targetDate).getTime()

  const [countdown, setCountdown] = useState(countdownDate - new Date().getTime())

  const getReturnValues = (cd: number) => {
    const minutes = Math.floor((cd % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((cd % (1000 * 60)) / 1000)
    return [minutes, seconds]
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(countdownDate - new Date().getTime())
    }, 1000)
    return () => clearInterval(interval)
  }, [countdownDate])

  return getReturnValues(countdown)
}

export const useFirstVisit = (cb: () => void) => {
  const [visited, setVisited] = useState(typeof window !== 'undefined' ? Boolean(localStorage.getItem('visited')) : false)

  useEffect(() => {
    if (!visited) {
      localStorage.setItem('visited', 'true')
      setVisited(true)
      cb()
    }
  }, [visited, cb])

  return { visited }
}

export const validCharacter = (char: string) => {
  const IS_CAPITAL_LETTER = (x: number) => x >= 65 && x <= 90
  const IS_LOWERCASE_LETTER = (x: number) => x >= 97 && x <= 122
  const IS_LETTER_ENYE = (x: number) => x === 209 || x === 241

  if (char.length === 1) {
    const ascii = char.charCodeAt(0)
    if (IS_CAPITAL_LETTER(ascii) || IS_LOWERCASE_LETTER(ascii) || IS_LETTER_ENYE(ascii)) {
      return char
    }
  }
  return undefined
}
