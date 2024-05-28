import QuantityController from '@/components/QuantityController'
import { path } from '@/constants'
import { formatAmount } from '@/utils'
import { DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

export default function Order() {
  const handleCheckAll = () => {}

  return (
    <div className='bg-neutral-100 pb-5 pt-2'>
      <div className='container'>
        <h4 className='my-5 text-[20px] font-medium uppercase leading-7 text-black'>Giỏ hàng</h4>
        <div className='flex gap-5 overflow-auto'>
          <div className='max-w-[910px]'>
            {/* Heading */}
            <div className='grid grid-cols-12 rounded-sm bg-white px-4 py-[9px] text-sm text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-[18px] w-[18px] cursor-pointer accent-[#0b74e5]'
                      checked={true}
                      onChange={handleCheckAll}
                    />
                  </div>
                  <div className='flex-grow text-[#242424]'>Tất cả (2 sản phẩm)</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-6 text-center text-[#242424]'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-2'>Số lượng</div>
                  <div className='col-span-1'>Thành tiền</div>
                  <div className='col-span-1 flex items-center justify-end'>
                    <DeleteOutlined className='cursor-pointer text-[18px] text-gray-500' />
                  </div>
                </div>
              </div>
            </div>

            {/* Order products */}
            <div className='my-3 rounded-sm bg-white shadow'>
              <div
                key={'id'}
                className='mb-5 grid grid-cols-12 items-center rounded-sm bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0'
              >
                <div className='col-span-6'>
                  <div className='flex'>
                    <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                      <input
                        type='checkbox'
                        className='h-[18px] w-[18px] cursor-pointer accent-[#0b74e5]'
                        checked={true}
                        onChange={() => {}}
                      />
                    </div>
                    <div className='flex-grow'>
                      <div className='flex'>
                        <Link className='h-20 w-20 flex-shrink-0' to={`${path.productGrid}/123`}>
                          <img
                            alt={'product name'}
                            src='https://salt.tikicdn.com/cache/w78/ts/product/f5/52/80/675e31a670afc560e7b0e46c0b65fb4f.png.webp'
                          />
                        </Link>
                        <div className='flex flex-grow items-center px-2'>
                          <Link
                            to={`${path.productGrid}/123`}
                            className='line-clamp-2 text-left text-[13px] leading-5 text-[#242424]'
                          >
                            {'Apple iPhone 14 Pro Max 128GB Tím'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-span-6'>
                  <div className='grid grid-cols-6 items-center'>
                    <div className='col-span-2'>
                      <div className='text-center'>
                        <span className='ml-3 mr-[5px] text-[13px] font-medium text-[#242424]'>
                          {formatAmount(25000000, 'vi-VN', 'VND')}
                        </span>
                        <span className='text-[11px] text-[#999] line-through'>
                          {formatAmount(27750000, 'vi-VN', 'VND')}
                        </span>
                      </div>
                    </div>

                    <div className='col-span-2 mx-auto'>
                      <QuantityController
                        max={5}
                        value={1}
                        classNameWrapper='w-[100px] justify-center'
                        classNameInput='w-8'
                        disabled={false}
                      />
                    </div>

                    <div className='col-span-1 text-center'>
                      <span className='text-[13px] font-medium leading-5 text-[#ff424e]'>
                        {formatAmount(25000000, 'vi-VN', 'VND')}
                      </span>
                    </div>

                    <div className='col-span-1 text-right'>
                      <DeleteOutlined className='cursor-pointer text-[18px] text-gray-500' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex-1'>
            <div className='rounded bg-white shadow'>
              <div className='border-b border-[#f4f4f4] p-5 text-[14px]'>
                <div className='mb-[10px] flex justify-between'>
                  <span className='font-light text-[#333]'>Tạm tính</span>
                  <span>{formatAmount(28030000, 'vi-VN', 'VND')}</span>
                </div>

                <div className='mb-[10px] flex justify-between'>
                  <span className='font-light text-[#333]'>Giảm giá</span>
                  <span>{formatAmount(-10000, 'vi-VN', 'VND')}</span>
                </div>

                <div className='mb-[10px] flex justify-between'>
                  <span className='font-light text-[#333]'>Thuế</span>
                  <span>10%</span>
                </div>

                <div className='mb-[10px] flex justify-between'>
                  <span className='font-light text-[#333]'>Phí giao hàng</span>
                  <span>{formatAmount(-40000, 'vi-VN', 'VND')}</span>
                </div>
              </div>

              <div className='flex justify-between p-5'>
                <span className='text-[14px] font-light text-[#333]'>Tổng tiền</span>
                <div className='flex flex-col text-right'>
                  <span className='text-[22px] font-normal text-[#fe3834]'>
                    {formatAmount(28020000, 'vi-VN', 'VND')}
                  </span>
                  <span className='text-[12px] font-light text-[#333]'>(Đã bao gồm VAT nếu có)</span>
                </div>
              </div>
            </div>

            <Button
              type='primary'
              danger
              className='mx-auto mt-[15px] h-[42px] w-full border-[1px] px-3 py-2 text-[15px] font-normal leading-6'
            >
              Mua hàng (2)
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
