import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AppProvider, SidebarProvider, ThemeProvider } from './contexts'
import App from './App'

import '@/i18n/i18n'
import '@/styles/index.scss'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <ThemeProvider>
            <SidebarProvider>
              <App />
            </SidebarProvider>
          </ThemeProvider>
        </AppProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
