import { useGame } from 'app/providers/GameProvider'
import Square from 'app/components/Board/Square'

import styles from './index.module.css'

export default function Row ({ index }: { index: number }) {
  const { responses } = useGame()

  return (
    <div className={styles.row}>
      <Square index={0}>{responses.at(index)?.at(0)}</Square>
      <Square index={1}>{responses.at(index)?.at(1)}</Square>
      <Square index={2}>{responses.at(index)?.at(2)}</Square>
      <Square index={3}>{responses.at(index)?.at(3)}</Square>
      <Square index={4}>{responses.at(index)?.at(4)}</Square>
    </div>
  )
}
