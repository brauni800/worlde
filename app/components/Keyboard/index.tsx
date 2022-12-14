import { ReactNode } from 'react'

import Key from 'app/components/Keyboard/Key'
import styles from './index.module.css'

const ROW_1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const ROW_2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ']
const ROW_3 = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']

const Row = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.row}>
      {children}
    </div>
  )
}

export default function Keyboard () {
  return (
    <div className={styles.container}>
      <Row>
        {ROW_1.map((char) => (
          <Key key={char}>
            {char}
          </Key>
        ))}
      </Row>
      <Row>
        {ROW_2.map((char) => (
          <Key key={char}>
            {char}
          </Key>
        ))}
      </Row>
      <Row>
        {ROW_3.map((char) => (
          <Key key={char}>
            {char}
          </Key>
        ))}
      </Row>
    </div>
  )
}
