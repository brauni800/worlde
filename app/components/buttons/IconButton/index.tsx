'use client'

import { ReactNode } from 'react'

import styles from './index.module.css'

interface IconButtonInterface {
  children: ReactNode
  onClick: () => void
}

export default function IconButton ({ children, onClick }: IconButtonInterface) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}
