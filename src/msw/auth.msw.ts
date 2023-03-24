import { rest } from 'msw'
import { HttpStatusCode } from '@/constants'

export const access_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmIzMTJjZDQ3NDc2ODliYTQwMzAxNSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Nzk2NDAyODksImV4cCI6MTY4MDUwNDI4OX0.Edxj2GdkF2Aruobsgz8EWyToARUqQXmtEWiU_yysBtc'

const loginRes = {
  status: 'OK',
  message: 'Login success!',
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmIzMTJjZDQ3NDc2ODliYTQwMzAxNSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Nzk1NTczNDgsImV4cCI6MTY4MDQyMTM0OH0.rKIp79JjwAbX3M68oBCtXxj8UqVH-OF7xupDIduUT5U'
}

const loginRequest = rest.post(`${import.meta.env.VITE_BASE_URL}/user/sign-in`, (req, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginRes))
})

export const authRequests = [loginRequest]
