import QuestionButton from 'app/components/buttons/QuestionButton'
import ThemeButton from 'app/components/buttons/ThemeButton'
import ChartButton from 'app/components/buttons/ChartButton'
import styles from './index.module.css'

export default function Header () {
  return (
    <div className={styles.container}>
      <QuestionButton />
      <span>Wordle</span>
      <div className={styles.buttonGroup}>
        <ChartButton />
        <ThemeButton size={1.5} />
      </div>
    </div>
  )
}
