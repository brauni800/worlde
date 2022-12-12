import QuestionSVG from 'public/svg/question_circle.svg'
import ThemeButton from 'app/components/ThemeButton'
import ChartSVG from 'public/svg/chart.svg'
import styles from './index.module.css'

export default function Header () {
  return (
    <div className={styles.container}>
      <QuestionSVG />
      <span>Worlde</span>
      <div className={styles.buttonGroup}>
        <ChartSVG />
        <ThemeButton size={1.5} />
      </div>
    </div>
  )
}
