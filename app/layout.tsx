import { ReactNode } from 'react'

import ThemeProvider from 'app/providers/ThemeProvider'
import styles from './layout.module.css'
import 'styles/globals.css'

export default function RootLayout ({
  children
}: {
  children: ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <ThemeProvider>
          <div className={styles.container}>
            <section>
              {children}
            </section>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
