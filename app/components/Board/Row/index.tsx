import Square from 'app/components/Board/Square'

import styles from './index.module.css'

export default function Row () {
  return (
    <div className={styles.row}>
      <Square>K</Square>
      <Square>K</Square>
      <Square>K</Square>
      <Square>K</Square>
      <Square>K</Square>
    </div>
  )
}
