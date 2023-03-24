import App from '@/App'
import { AppProvider, getInitialAppContext } from '@/contexts'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, type waitForOptions } from '@testing-library/react'
// import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

export const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })

// export const logScreen = async (
//   body: HTMLElement = document.body.parentElement as HTMLElement,
//   options?: waitForOptions
// ) => {
//   const { timeout = 1000 } = options || {}
//   await waitFor(
//     async () => {
//       expect(await delay(timeout - 100)).toBe(true)
//     },
//     {
//       ...options,
//       timeout
//     }
//   )
//   screen.debug(body, 99999999)
// }

export const createWrapper = () => {
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
  const Provider = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  return Provider
}

const Provider = createWrapper()

export const renderWithRouter = ({ route = '' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  const defaultValueAppContext = getInitialAppContext()

  return {
    user: userEvent.setup(),
    ...render(
      <Provider>
        <AppProvider defaultValue={defaultValueAppContext}>
          <App />
        </AppProvider>
      </Provider>,
      { wrapper: BrowserRouter }
    )
  }
}
