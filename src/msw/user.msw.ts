import { rest } from 'msw'
import { HttpStatusCode } from '@/constants'

const profileRes = {
  status: 'OK',
  message: 'Success',
  data: {
    _id: '63fb312cd4747689ba403015',
    email: 'capbaodien@gmail.com',
    isAdmin: false,
    address: 'Ho Chi Minh',
    avatar: 'http://res.cloudinary.com/dktajq8sb/image/upload/v1679641474/users/rg5iej8gehz3yzjbaxyu.jpg',
    name: 'Cap Bao Dien',
    phone: '12345678901',
    deleted: false
  }
}

const profileRequest = rest.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, (req, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(profileRes))
})

export const userRequests = [profileRequest]
