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
