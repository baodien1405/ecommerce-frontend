import Image from '@/components/Image'
import QuantityController from '@/components/QuantityController'
import { Button, Rate } from 'antd'

export default function ProductDetail() {
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

  const handleBuyCount = () => {
    return null
  }

  return (
    <div className='h-[calc(100vh-61px)] bg-[#efefef]'>
      <div className='container'>
        <h4 className='py-[10px] text-sm font-light text-[#808089]'>Trang chủ</h4>
        <div className='flex gap-1'>
          <div className='rounded bg-white p-4'>
            <Image
              className='h-[444px] w-[444px] object-contain'
              alt='image'
              src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'
            />

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
            <h1 className='mb-1 break-words text-2xl font-light text-[#242424]'>Apple iPhone 14 Pro</h1>
            <div className='mb-4 flex items-center'>
              <Rate className='text-[12px] [&>li]:-ml-[5px]' disabled defaultValue={5} />
              <span className='ml-2 text-base text-[#787878]'>(Xem 201 đáng giá)</span>
              <div className='mx-2 h-3 w-[1px] bg-[#c7c7c7]'></div>
              <span className='text-base text-[#787878]'>Đã bán 743</span>
            </div>

            <div className='mb-4 flex w-[480px] items-baseline rounded bg-[#fafafa] px-4 py-3'>
              <div className='mr-2 text-[32px] font-medium leading-10 text-[#ff424e]'>26.990.000 ₫</div>
              <div className='text-sm text-[#808089] line-through'>30.990.000 ₫</div>
              <div className='ml-1 px-1 text-[14px] font-medium leading-[18px] text-[#ff424e]'>-13%</div>
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
          </div>
        </div>
      </div>
    </div>
  )
}
