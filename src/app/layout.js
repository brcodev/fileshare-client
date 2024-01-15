import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import AuthState from '@/context/auth/authState'
import AppState from '@/context/app/appState'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FileShare',
  description: 'Easy share files app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthState>
          <AppState>
            <div className='bg-gray-100 min-h-screen'>
              <div className='container mx-auto p-2 md:p-0'>
                <Header />
                <main className=''>
                  {children}
                </main>
              </div>
            </div>
          </AppState>
        </AuthState>
      </body>
    </html>
  )
}
