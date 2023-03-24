import { afterAll, afterEach, beforeAll, expect } from 'vitest'
import { setupServer } from 'msw/node'
import { authRequests, productRequests, userRequests } from './src/msw'
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

// eslint-disable-next-line no-undef
window.matchMedia =
  // eslint-disable-next-line no-undef
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {}
    }
  }

const server = setupServer(...authRequests, ...productRequests, ...userRequests)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
