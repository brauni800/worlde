'use client'
import { useEffect } from 'react'

import { useGame } from 'app/providers/GameProvider'
import Row from 'app/components/Board/Row'

import styles from './index.module.css'

export default function Board ({ dictionary }: { dictionary: string[] }) {
  const { startGame } = useGame()

  useEffect(() => {
    if (dictionary.length) {
      startGame({ dictionary })
    }
  }, [dictionary, startGame])

  return (
    <div className={styles.board}>
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
    </div>
  )
}
