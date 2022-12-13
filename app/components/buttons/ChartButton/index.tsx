'use client'
import { useState } from 'react'

import IconButton from 'app/components/buttons/IconButton'
import { useGame } from 'app/providers/GameProvider'
import Modal from 'app/components/Modal'

import ChartSVG from 'public/svg/chart.svg'
import styles from './index.module.css'

export default function ChartButton () {
  const [open, setOpen] = useState(false)

  const { timer, word, victories, games } = useGame()

  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton onClick={handleOpenModal}>
        <ChartSVG />
      </IconButton>
      <Modal open={open} onClose={handleCloseModal}>
        <div className={styles.modal}>
          <h1>Estadísticas</h1>
          <section>
            <div className={styles.record}>
              <p><span>{games}</span></p>
              <p>Jugadas</p>
            </div>
            <div className={styles.record}>
              <p><span>{victories}</span></p>
              <p>Victorias</p>
            </div>
          </section>
          <section>
            <p>
              La palabra es: <span>{word}</span>
            </p>
            <p className={styles.uppercase}>
              Siguiente palabra
            </p>
            <span>
              {timer}
            </span>
          </section>
          <section>
            <button onClick={handleCloseModal}>
              Aceptar
            </button>
          </section>
        </div>
      </Modal>
    </>
  )
}
