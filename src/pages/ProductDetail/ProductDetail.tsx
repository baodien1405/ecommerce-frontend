import { RightOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Rate, Spin } from 'antd'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'

import productApi from '@/api/product.api'
import Image from '@/components/Image'
import QuantityController from '@/components/QuantityController'
import { path } from '@/constants'
import { formatAmount } from '@/utils'

const reviewImageList = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
    showMore: true
  }
]

export default function ProductDetail() {
  const { productId } = useParams()

  const { data: productDetailData, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productApi.getProduct(productId as string)
  })
  const product = productDetailData?.data.data

  const handleBuyCount = () => {
    return null
  }

  return (
    <div className='h-[calc(100vh-61px)] bg-[#efefef]'>
      <Helmet>
        <title>{product?.name} | Tiki Clone</title>
        <meta name='description' content={product?.description} />
      </Helmet>
      <div className='container'>
        <h4 className='flex items-center gap-2 py-[10px] text-sm font-light text-[#808089]'>
          <Link to={path.product}>Trang chủ</Link>
          <RightOutlined />
          <span>{product?.name}</span>
        </h4>

        <div className='flex gap-1'>
          <div className='rounded bg-white p-4'>
            {product?.image ? (
              <Image className='h-[444px] w-[444px] object-contain' alt='image' src={product?.image as string} />
            ) : (
              <div
                role='status'
                className='w-[444px] animate-pulse rounded border border-gray-200 p-2 shadow dark:border-gray-700 md:p-2'
              >
                <div className='mb-4 flex h-[428px] items-center justify-center rounded bg-gray-300 dark:bg-gray-700'>
                  <svg
                    className='h-12 w-12 text-gray-200 dark:text-gray-600'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                    fill='currentColor'
                    viewBox='0 0 640 512'
                  >
                    <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
                  </svg>
                </div>
              </div>
            )}

            <div className='mt-4 flex gap-3'>
              {reviewImageList.map((item) => {
                return (
                  <Image
                    key={item.id}
                    className='h-[64px] w-[64px] rounded border-[1px] border-[#0d5cb6] object-contain'
                    alt='image'
                    src={item.url}
                  />
                )
              })}
            </div>
          </div>

          <div className='flex-1 rounded bg-white p-4'>
            <Spin spinning={isLoading} className='flex items-center justify-center'>
              <h1 className='mb-1 break-words text-2xl font-light text-[#242424]'>{product?.name}</h1>
              <div className='mb-4 flex items-center'>
                <Rate className='text-[12px] [&>li]:-ml-[5px]' disabled defaultValue={5} />
                <span className='ml-2 text-base text-[#787878]'>(Xem 201 đáng giá)</span>
                <div className='mx-2 h-3 w-[1px] bg-[#c7c7c7]'></div>
                <span className='text-base text-[#787878]'>Đã bán 743</span>
              </div>

              <div className='mb-4 flex w-[480px] items-baseline rounded bg-[#fafafa] px-4 py-3'>
                <div className='mr-2 text-[32px] font-medium leading-10 text-[#ff424e]'>
                  {formatAmount(Number(product?.price || 0), 'vi-VN', 'VND')}
                </div>
                <div className='text-sm text-[#808089] line-through'>30.990.000 ₫</div>
                <div className='ml-1 px-1 text-[14px] font-medium leading-[18px] text-[#ff424e]'>
                  -{product?.discount || 13}%
                </div>
              </div>

              <div className='border-t-[1px] border-[#f2f2f2] py-3'>
                <span>{'Giao đến '}</span>
                <span className='overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-medium leading-6 underline'>
                  Q. 1, P. Bến Nghé, Hồ Chí Minh
                </span>
                <span>{' - '}</span>
                <span className='text-base font-medium text-[#0b74e5]'>Đổi địa chỉ</span>
              </div>

              <div className='border-t-[1px] border-[#f2f2f2] py-4'>
                <div className='mb-[10px] text-[15px] capitalize leading-relaxed'>Số lượng</div>
                <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={12}
                  max={100}
                />
              </div>

              <div className='mt-4 flex w-[490px] gap-3'>
                <Button
                  type='primary'
                  danger
                  className='mx-auto h-[48px] w-60 border-[1px] px-3 py-2 text-[15px] font-medium leading-6'
                >
                  Chọn mua
                </Button>

                <Button
                  type='primary'
                  ghost
                  className='mx-auto flex h-[48px] w-60 flex-col items-center justify-center border-[1px] border-[#0d5cb6] px-3 py-2 text-[#0d5cb6]'
                >
                  <span className='text-[15px] font-medium leading-[1.6]'>Trả góp</span>
                  <span className='text-[11px] leading-[1.45]'>2.207.500 ₫/tháng</span>
                </Button>
              </div>
            </Spin>
          </div>
        </div>
      </div>
    </div>
  )
}
