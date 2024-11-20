import type { Metadata } from 'next'
import './globals.css'
import { Quicksand } from 'next/font/google'
import { GlobalContextProvider } from './context/OpenMenuMobileContext'
const quicksand = Quicksand({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Project web',
  description: 'Ecomerce',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body className={quicksand.className}>
        <GlobalContextProvider>
          <div className='flex items-end pb-8'>
            <div className='absolute top-0 w-full'>{children}</div>
          </div>
        </GlobalContextProvider>
      </body>
    </html>
  )
}
