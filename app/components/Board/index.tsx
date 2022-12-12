import Row from 'app/components/Board/Row'

import styles from './index.module.css'

export default function Board () {
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
