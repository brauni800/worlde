'use client'
import { ReactNode, useState } from 'react'

import IconButton from 'app/components/buttons/IconButton'
import Modal from 'app/components/Modal'

import QuestionSVG from 'public/svg/question_circle.svg'
import styles from './index.module.css'
import { useGame } from 'app/providers/GameProvider'

const Square = ({ children, fill }: { children: ReactNode, fill?: string }) => {
  return (
    <div
      style={{ backgroundColor: fill }}
      className={styles.square}
    >
      {children}
    </div>
  )
}

export default function QuestionButton () {
  const { nextGame } = useGame()
  const [open, setOpen] = useState(false)

  const handlePlayClick = () => {
    nextGame()
  }

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <QuestionSVG />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={styles.modal}>
          <h1>Cómo jugar</h1>
          <section>
            <p>Adivina la palabra oculta en cinco intentos.</p>
            <p>Cada intento debe ser una palabra válida de 5 letras.</p>
            <p>Después de cada intento el color de las letras cambia para mostrar qué tan cerca estás de acertar la palabra.</p>
          </section>
          <section>
            <h2>Ejemplos</h2>
            <article>
              <div className={styles.squareContainer}>
                <Square fill='var(--success-color)'>G</Square>
                <Square>A</Square>
                <Square>T</Square>
                <Square>O</Square>
                <Square>S</Square>
              </div>
              <p>La letra <span>G</span> está en la palabra y en la posición correcta.</p>
            </article>
            <article>
              <div className={styles.squareContainer}>
                <Square>V</Square>
                <Square>O</Square>
                <Square fill='var(--warning-color)'>C</Square>
                <Square>A</Square>
                <Square>L</Square>
              </div>
              <p>La letra <span>C</span> está en la palabra pero en la posición incorrecta.</p>
            </article>
            <article>
              <div className={styles.squareContainer}>
                <Square>C</Square>
                <Square>A</Square>
                <Square>N</Square>
                <Square>T</Square>
                <Square fill='var(--disabled-color)'>O</Square>
              </div>
              <p>La letra <span>O</span> no está en la palabra.</p>
            </article>
          </section>
          <section>
            <p>
              Puede haber letras repetidas. Las pistas son independientes para cada letra.
            </p>
            <p className={styles.textCenter}>
              ¡Una palabra nueva cada 5 minutos!
            </p>
          </section>
          <section>
            <button onClick={handlePlayClick}>¡Jugar!</button>
          </section>
        </div>
      </Modal>
    </>
  )
}
