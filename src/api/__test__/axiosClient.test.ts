import { describe, it, expect } from 'vitest'
import { HttpStatusCode } from '@/constants'
import axiosClient from '../axiosClient'

describe('axiosClient', () => {
  it('Call API', async () => {
    const res = await axiosClient.get('/product')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('Auth Request', async () => {
    await axiosClient.post('/user/sign-in', {
      email: 'capbaodien@gmail.com',
      password: '123456'
    })
    const res = await axiosClient.get('/user/profile')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
