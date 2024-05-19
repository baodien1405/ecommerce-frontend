import { useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { HelmetProvider } from 'react-helmet-async'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'styled-components'

import { LocalStorageEventTarget, ThemeStyles } from '@/utils'
import { AppContext, useTheme } from '@/contexts'
import AppRoutes from '@/routes/AppRoutes'
import ErrorBoundary from '@/components/ErrorBoundary'
import Sidebar from '@/components/Sidebar'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  const { reset } = useContext(AppContext)
  const { theme } = useTheme()

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider theme={{ theme: theme }}>
          <ThemeStyles />
          <Sidebar />
          <AppRoutes />
          <ToastContainer />
        </ThemeProvider>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </HelmetProvider>
  )
}

export default App
