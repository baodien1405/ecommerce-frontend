import { waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { path } from '@/constants'
import { renderWithRouter, setAccessTokenToLS } from '@/utils'
import { access_token } from '@/msw'

describe('Profile', () => {
  it('should display profile page', async () => {
    setAccessTokenToLS(access_token)
    const { container } = renderWithRouter({ route: path.profile })

    await waitFor(async () => {
      expect(document.querySelector('title')?.textContent).toBe('Profile | Tiki Clone')
      expect((container.querySelector('form input[placeholder="Thêm tên"]') as HTMLInputElement).value).toBe(
        'Cap Bao Dien'
      )
    })
  })
})
