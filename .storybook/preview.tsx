import '../src/index.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { AppProvider } from '../src/contexts'
import ErrorBoundary from '../src/components/ErrorBoundary'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    },
    mutations: {
      retry: false
    }
  },
  logger: {
    log: console.log,
    warn: console.warn,
    // no more errors on the console
    error: () => {}
  }
})

export const decorators = [
  (Story) => (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <HelmetProvider>
            <ErrorBoundary>
              <Story />
            </ErrorBoundary>
          </HelmetProvider>
        </AppProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
]
