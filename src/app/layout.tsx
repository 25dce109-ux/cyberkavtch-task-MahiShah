import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'CyberKavach Club - Digital Operating System',
  description: 'Complete digital platform for CyberKavach Club management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
