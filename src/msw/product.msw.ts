import { rest } from 'msw'
import { HttpStatusCode } from '@/constants'

const productsRes = {
  status: 'OK',
  message: 'Success',
  data: [
    {
      _id: '64056b0bdccd78f80c205572',
      name: 'Beefsteak',
      image: 'http://res.cloudinary.com/dktajq8sb/image/upload/v1679639590/products/x4cpfljsjqgj58gqqfgy.jpg',
      type: 'meat',
      price: 200000,
      countInStock: 5,
      rating: 5,
      description: 'Thịt tươi nè!'
    },
    {
      _id: '64057040dccd78f80c205583',
      name: 'Chôm Chôm',
      image: 'http://res.cloudinary.com/dktajq8sb/image/upload/v1679639612/products/kf1zh7gqu9ddbdx3jmh0.jpg',
      type: 'fruit',
      price: 15000,
      countInStock: 560,
      rating: 4,
      description: 'Chôm chôm Long Thành'
    },
    {
      _id: '641805f625a22d2aae30ec71',
      name: 'Hamburger',
      image: 'http://res.cloudinary.com/dktajq8sb/image/upload/v1679295991/i1w9aert6jcx38u5nxhi.jpg',
      type: 'candy',
      price: 1500,
      countInStock: 123,
      rating: 4.4,
      description: 'Bánh ngon'
    },
    {
      _id: '64180824c057cc62c5f8decf',
      name: 'Iphone 13',
      image: 'http://res.cloudinary.com/dktajq8sb/image/upload/v1679297374/products/um6rssm7gkrum0by64jl.png',
      type: 'phone',
      price: 1500444,
      countInStock: 123,
      rating: 4.4,
      description: 'Điện thoại nè'
    },
    {
      _id: '64057172dccd78f80c205586',
      name: 'Iphone 34',
      image: 'http://res.cloudinary.com/dktajq8sb/image/upload/v1679639857/products/qhvam93de3lp9o0zl2gu.jpg',
      type: 'phone',
      price: 1500,
      countInStock: 12,
      rating: 4,
      description: 'Điện thoại nè'
    },
    {
      _id: '64056cd7dccd78f80c205576',
      name: 'Kẹo bò sữa',
      image: 'http://res.cloudinary.com/dktajq8sb/image/upload/v1679639665/products/qqrwg7vgtn3wgmo2g5tk.jpg',
      type: 'candy',
      price: 10000,
      countInStock: 34,
      rating: 3,
      description: 'Kẹo ngon nè!'
    },
    {
      _id: '64056a4edccd78f80c20556d',
      name: 'Milo 1',
      image: 'http://res.cloudinary.com/dktajq8sb/image/upload/v1679639683/products/g4elvrmnivhca53oevgp.webp',
      type: 'milk',
      price: 15000,
      countInStock: 14,
      rating: 5,
      description: 'Mua sữa đi nào!'
    },
    {
      _id: '64056f5bdccd78f80c20557e',
      name: 'Pepsi',
      image: 'http://res.cloudinary.com/dktajq8sb/image/upload/v1679639714/products/tmokxoueoi6ltr7ioyxw.png',
      type: 'drink',
      price: 12000,
      countInStock: 100,
      rating: 2,
      description: 'Nước ngọt có gas'
    }
  ],
  pagination: {
    _page: 1,
    _limit: 8,
    _totalRows: 20
  }
}

const productDetailRes = {
  status: 'OK',
  message: 'Success',
  data: {
    _id: '64180824c057cc62c5f8decf',
    name: 'Iphone 13',
    image: 'http://res.cloudinary.com/dktajq8sb/image/upload/v1679297374/products/um6rssm7gkrum0by64jl.png',
    type: 'phone',
    price: 1500444,
    countInStock: 123,
    rating: 4.4,
    description: 'Điện thoại nè'
  }
}

const productsRequest = rest.get(`${import.meta.env.VITE_BASE_URL}/product`, (req, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(productsRes))
})

const productDetailRequest = rest.get(
  `${import.meta.env.VITE_BASE_URL}/product/64180824c057cc62c5f8decf`,
  (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(productDetailRes))
  }
)

export const productRequests = [productsRequest, productDetailRequest]
