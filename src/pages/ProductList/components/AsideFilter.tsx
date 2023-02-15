import { CheckboxGroupField } from '@/components/FormFields'
import { Rate } from 'antd'

export function AsideFilter() {
  const productCategoryList = [
    'Điện thoại smartphone',
    'Máy tính bảng',
    'Máy đọc sách',
    'Điện thoại phổ thông',
    'Điện thoại bàn'
  ]

  const priceList = ['Dưới 2.000.000', '2.000.000 -> 5.000.000', '5.000.000 -> 22.000.000', 'Trên 22.000.000']

  const serviceList = [
    { label: 'Giao Hàng Siêu Tốc 2H', value: 1 },
    { label: 'Thưởng Thêm Astra', value: 2 },
    { label: 'Không Giới Hạn', value: 3 },
    { label: 'Trả Góp 0%', value: 4 },
    { label: 'Giảm Sâu', value: 5 }
  ]
  return (
    <div className='w-[200px] overflow-hidden rounded-l-[4px] bg-white px-4 py-3'>
      <div>
        <h4 className='pb-3 text-sm font-medium text-[#38383d]'>Danh mục sản phẩm</h4>
        <ul>
          {productCategoryList.map((item) => (
            <li key={item} className='pb-3 text-xs font-normal text-[#38383d] '>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className='border-t-[1px] border-t-[#f7f7f7]'>
        <h4 className='py-3 pb-3 text-sm font-medium text-[#38383d]'>Dịch vụ</h4>
        <CheckboxGroupField name='service' options={serviceList} defaultValue={[1]} />
      </div>

      <div className='border-t-[1px] border-t-[#f7f7f7]'>
        <h4 className='py-3 pb-3 text-sm font-medium text-[#38383d]'>Đánh giá</h4>
        <div>
          {[5, 4, 3].map((option) => (
            <div key={option} className='flex gap-[3px] py-[5px]'>
              <Rate className='text-[12px] [&>li]:-ml-[5px]' disabled defaultValue={option} />
              <span className='text-[13px] font-normal text-[#242424]'>{`từ ${option} sao`}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='border-t-[1px] border-t-[#f7f7f7]'>
        <h4 className='py-3 pb-3 text-sm font-medium text-[#38383d]'>Giá</h4>
        <div>
          {priceList.map((price) => (
            <div key={price} className='mb-1 inline-block rounded-xl bg-[#eee] py-1 px-3 text-xs text-[#38383d]'>
              {price}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
