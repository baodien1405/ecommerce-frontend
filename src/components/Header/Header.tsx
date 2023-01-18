import { Col, Row, Input } from 'antd'
const { Search } = Input

import Image from '@/components/Image'
import images from '@/assets/images'
import { CaretDownOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'

export default function Header() {
  const handleSearch = () => {
    return null
  }
  return (
    <div className='bg-[#1a94ff]'>
      <div className='container w-full'>
        <Row gutter={16} className='flex items-center justify-between py-[10px]'>
          <Col span={6}>
            <Image src={images.logo} alt='logo' className='w-[60px]' />
          </Col>
          <Col span={12}>
            <Search
              placeholder='Search product...'
              onSearch={handleSearch}
              size='large'
              enterButton={
                <div className='flex items-center gap-4'>
                  <SearchOutlined />
                  <span>Search</span>
                </div>
              }
            />
          </Col>
          <Col span={6}>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4 text-white'>
                <UserOutlined className='text-[32px]' />
                <div>
                  <span className='text-xs'>Login/Logout</span>
                  <div className='flex items-center text-[13px] leading-[20px]'>
                    <span>Account</span>
                    <CaretDownOutlined />
                  </div>
                </div>
              </div>

              <div className='flex items-end gap-[8px] text-white'>
                <div className='relative'>
                  <ShoppingCartOutlined className='text-[32px]' />
                  <span className='absolute -top-[2px] left-[20px] inline-block h-[20px] rounded-[40px] bg-[#fdd835] py-0 px-[7px] text-center text-[13px] font-bold leading-[20px] text-[#242424]'>
                    0
                  </span>
                </div>
                <span className='text-[12px]'>Cart</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
