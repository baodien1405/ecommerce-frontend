import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Col, Row, Input, Tooltip, Popover } from 'antd'
import { useNavigate } from 'react-router-dom'
import { CaretDownOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'

import Image from '@/components/Image'
import images from '@/assets/images'
import { path } from '@/constants'
import { AppContext } from '@/contexts'
import { GlobalIcon } from '@/components/Icons'
import { clearLS } from '@/utils'

const { Search } = Input

export default function Header() {
  const navigate = useNavigate()
  const { profile, reset } = useContext(AppContext)
  const [t, i18n] = useTranslation('header')
  const currentLanguage = i18n.language

  const handleSearch = () => {
    return null
  }

  const handleNavigateLogin = () => {
    navigate(path.login)
  }

  const changeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
  }

  const handleLogout = () => {
    reset()
    clearLS()
  }

  return (
    <div className='bg-[#1a94ff]'>
      <div className='container w-full'>
        <Row gutter={16} className='flex items-center justify-between py-[10px]'>
          <Col span={5}>
            <Image src={images.logo} alt='logo' className='w-[60px]' onClick={() => navigate(path.product)} />
          </Col>
          <Col span={13}>
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
                {profile?.avatar ? (
                  <Image className='h-[30px] w-[30px] rounded-full object-cover' alt='image' src={profile?.avatar} />
                ) : (
                  <UserOutlined className='text-[32px]' />
                )}

                {profile?.email ? (
                  <Popover
                    placement='bottom'
                    content={
                      <>
                        <div
                          className='rounded py-2 px-2 transition hover:cursor-pointer hover:bg-slate-500 hover:text-white'
                          onClick={handleLogout}
                        >
                          {t('logout')}
                        </div>
                        <div
                          className='rounded py-2 px-2 transition hover:cursor-pointer hover:bg-slate-500 hover:text-white'
                          onClick={() => navigate(path.profile)}
                        >
                          {t('customer information')}
                        </div>
                      </>
                    }
                    trigger='click'
                  >
                    <div className='cursor-pointer py-2'>{profile.name || profile.email}</div>
                  </Popover>
                ) : (
                  <div className='cursor-pointer' onClick={handleNavigateLogin}>
                    <span className='text-xs'>Login/Logout</span>
                    <div className='flex items-center text-[13px] leading-[20px]'>
                      <span>Account</span>
                      <CaretDownOutlined />
                    </div>
                  </div>
                )}
              </div>

              <div className='flex items-end gap-[8px] text-white'>
                <div className='relative'>
                  <ShoppingCartOutlined className='text-[32px]' />
                  <span className='absolute -top-[2px] left-[20px] inline-block h-[20px] rounded-[40px] bg-[#fdd835] py-0 px-[7px] text-center text-[13px] font-bold leading-[20px] text-[#242424]'>
                    0
                  </span>
                </div>
              </div>

              <Tooltip
                title={
                  <div className='w-[150px] cursor-pointer'>
                    <div
                      className={`rounded p-3 text-base font-bold transition ${
                        currentLanguage === 'vi' ? 'bg-slate-500 text-white' : 'text-black'
                      }`}
                      onClick={() => changeLanguage('vi')}
                    >
                      Tiếng Việt
                    </div>
                    <div
                      className={`rounded p-3 text-base font-bold transition ${
                        currentLanguage === 'en' ? 'bg-slate-500 text-white' : 'text-black'
                      }`}
                      onClick={() => changeLanguage('en')}
                    >
                      English
                    </div>
                  </div>
                }
                color='white'
              >
                <button>
                  <GlobalIcon className='cursor-pointer text-white' />
                </button>
              </Tooltip>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
