import './globals.css'
import { Inter } from 'next/font/google'
import { MyContextProvider } from '@/contexts/MyContextProvider'
import { Header } from '@/components/header/Header'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Учебный портал',
  description: 'Закрытая площадка для образования',
}
export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <MyContextProvider>
        <body className={inter.className}>
          <Header/>
          {children}
        </body>
      </MyContextProvider>
    </html>
  )
}
