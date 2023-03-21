import { setAccessTokenToLS, getAccessTokenFromLS, clearLS } from '@/utils'
import { describe, it, expect, beforeEach } from 'vitest'

const access_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWVmODVhZDI0MDIzYmQ1ZWI1NGM0MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3OTM3MzU2NiwiZXhwIjoxNjgwMjM3NTY2fQ.zeOnjcVTtI3MAPeJwjr0RF57v7Y53azwKEd-7Ooiu1Q'

beforeEach(() => {
  localStorage.clear()
})

describe('access_token', () => {
  it('access_token is set in localStorage', () => {
    setAccessTokenToLS(access_token)
    expect(getAccessTokenFromLS()).toBe(access_token)
  })
})

describe('clearLS', () => {
  it('Remove all access_token, profile', () => {
    setAccessTokenToLS(access_token)
    clearLS()
    expect(getAccessTokenFromLS()).toBe('')
  })
})
