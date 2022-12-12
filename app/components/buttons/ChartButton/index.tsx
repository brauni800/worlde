'use client'
import { useState } from 'react'

import IconButton from 'app/components/buttons/IconButton'
import Modal from 'app/components/Modal'

import ChartSVG from 'public/svg/chart.svg'
import styles from './index.module.css'

export default function ChartButton () {
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <ChartSVG />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={styles.modal}>
          <h1>Estadísticas</h1>
          <section>
            <div className={styles.record}>
              <p><span>8</span></p>
              <p>Jugadas</p>
            </div>
            <div className={styles.record}>
              <p><span>2</span></p>
              <p>Victorias</p>
            </div>
          </section>
          <section>
            <p>
              La palabra es: <span>PERRO</span>
            </p>
            <p className={styles.uppercase}>
              Siguiente palabra
            </p>
            <span>
              04:10
            </span>
          </section>
          <section>
            <button>
              Aceptar
            </button>
          </section>
        </div>
      </Modal>
    </>
  )
}
