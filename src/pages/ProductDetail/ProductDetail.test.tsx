import { describe, it, expect } from 'vitest'
import { delay, renderWithRouter } from '@/utils'

describe('Product Detail', () => {
  it('should render UI ProductDetail', async () => {
    renderWithRouter({ route: '/64180824c057cc62c5f8decf' })
    await delay(1000)
    expect(document.body).toMatchSnapshot()
  })
})
