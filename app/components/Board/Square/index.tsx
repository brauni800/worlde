import { ReactNode } from 'react'

import styles from './index.module.css'

export default function Square ({ children }: { children: ReactNode }) {
  return (
    <div className={styles.square}>
      {children}
    </div>
  )
}
