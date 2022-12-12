'use client'

import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { useMountTransition, useOutsideClick } from 'app/hooks'
import styles from './index.module.css'

interface ModalInterface {
  children: ReactNode
  onClose: () => void
  open: boolean
}

export default function Modal ({ open, children, onClose }: ModalInterface) {
  const hasTransitionedIn = useMountTransition(open, 1000)
  const modalRef = useOutsideClick(() => {
    if (onClose) onClose()
  })

  useEffect(() => {
    if (hasTransitionedIn || open) {
      document.body.style.setProperty('overflow', 'hidden')
    } else {
      document.body.style.removeProperty('overflow')
    }

    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [hasTransitionedIn, open])

  if (hasTransitionedIn || open) {
    return createPortal(
      <div className={styles.background}>
        <div
          className={`${styles.modal}${hasTransitionedIn ? ` ${styles.in}` : ''}${open ? ` ${styles.visible}` : ''}`}
          ref={modalRef}
        >
          {children}
        </div>
      </div>
      , document.body)
  } else return null
}
