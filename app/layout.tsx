import { ReactNode } from 'react'
import 'styles/globals.css'

import ThemeProvider from 'app/providers/ThemeProvider'

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
