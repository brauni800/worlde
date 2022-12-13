import { ReactNode } from 'react'

import ThemeProvider from 'app/providers/ThemeProvider'
import GameProvider from 'app/providers/GameProvider'
import Body from 'app/components/Body'

import styles from './layout.module.css'
import 'styles/globals.css'

export default function RootLayout ({
  children
}: {
  children: ReactNode
}) {
  return (
    <html>
      <ThemeProvider>
        <GameProvider>
          <head />
          <Body>
            <div className={styles.container}>
              <section>
                {children}
              </section>
            </div>
          </Body>
        </GameProvider>
      </ThemeProvider>
    </html>
  )
}
