import { waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { path } from '@/constants'
import { delay, renderWithRouter, setAccessTokenToLS } from '@/utils'
import { access_token } from '@/msw'

describe('Profile', () => {
  it('should render UI Profile', async () => {
    setAccessTokenToLS(access_token)
    const { container } = renderWithRouter({ route: path.profile })

    await delay(1000)
    await waitFor(async () => {
      expect(document.querySelector('title')?.textContent).toBe('Profile | Tiki Clone')
      expect(container.querySelector('form input[id="name"]')).toBeInTheDocument()
    })
  })
})
