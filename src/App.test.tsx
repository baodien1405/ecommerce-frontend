import matchers from '@testing-library/jest-dom/matchers'
import { screen, waitFor } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { path } from './constants'
import { renderWithRouter } from './utils'
// import { logScreen } from './utils'

expect.extend(matchers)
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {}
    }
  }

describe('App', () => {
  test('App render and redirect', async () => {
    const { user } = renderWithRouter()

    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Homepage | Tiki Clone')
    })

    await user.click(screen.getByText(/Tài khoản/i))

    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Login | Tiki Clone')
      expect(screen.queryByText('Chưa có tài khoản?')).toBeInTheDocument()
    })
  })

  test('Redirect to not found page', async () => {
    const badRoute = '/some/bad/route'
    renderWithRouter({ route: badRoute })
    await waitFor(() => {
      expect(document.querySelector('img[alt="404"]')).toBeInTheDocument()
    })
  })

  test('Render sign up page', async () => {
    renderWithRouter({ route: path.register })
    await waitFor(() => {
      expect(screen.queryByText('Bạn đã có tài khoản?')).toBeInTheDocument()
    })
    // screen.debug(document.body.parentElement as HTMLElement, 999999999)
  })
})
