import QuestionButton from 'app/components/buttons/QuestionButton'
import ThemeButton from 'app/components/buttons/ThemeButton'
import styles from './index.module.css'

import ChartSVG from 'public/svg/chart.svg'

export default function Header () {
  return (
    <div className={styles.container}>
      <QuestionButton />
      <span>Worlde</span>
      <div className={styles.buttonGroup}>
        <ChartSVG />
        <ThemeButton size={1.5} />
      </div>
    </div>
  )
}
