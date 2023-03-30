import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Input, Tooltip } from 'antd'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import images from '@/assets/images'
import { GlobalIcon } from '@/components/Icons'
import Image from '@/components/Image'
import { path } from '@/constants'
import { AppContext } from '@/contexts'
import { locales } from '@/i18n/i18n'
import { clearLS } from '@/utils'
import { useSearchProducts } from '@/hooks'

const { Search } = Input

export default function Header() {
  const navigate = useNavigate()
  const { profile, reset } = useContext(AppContext)
  const { onSubmitSearch } = useSearchProducts()
  const [t, i18n] = useTranslation('header')
  const currentLanguage = i18n.language as 'en' | 'vi'

  const quickLinks = [
    { id: '1', to: '', content: t('quick links.fruit') },
    { id: '2', to: '', content: t('quick links.meat, egg') },
    { id: '3', to: '', content: t('quick links.vegetable') },
    { id: '4', to: '', content: t('quick links.milk, butter, cheese') },
    { id: '5', to: '', content: t('quick links.seafood') },
    { id: '6', to: '', content: t('quick links.rice, noodles') },
    { id: '7', to: '', content: t('quick links.drink, bear, wine') },
    { id: '8', to: '', content: t('quick links.cake, candy') }
  ]

  const handleSearch = (value: string) => {
    onSubmitSearch({
      name: value.toLowerCase()
    })
  }

  const changeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
  }

  const handleLogout = () => {
    reset()
    clearLS()
  }

  return (
    <div className='mb-1 py-2 shadow'>
      <div className='container w-full'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-1 items-center'>
            <div className='mr-12'>
              <Image
                src={images.blueLogo}
                alt='logo'
                className='w-[60px] cursor-pointer'
                onClick={() => navigate(path.product)}
              />
            </div>

            <div className='flex-1'>
              <Search
                placeholder='Search product...'
                onSearch={handleSearch}
                size='large'
                enterButton={
                  <div className='flex items-center gap-4'>
                    <SearchOutlined />
                    <span>{t('search')}</span>
                  </div>
                }
              />
            </div>
          </div>

          <div className='ml-12 flex items-center'>
            <div className='flex cursor-pointer items-center rounded-lg py-2 px-4 hover:bg-[#0060ff1f]'>
              <Image
                className='mr-1 h-6 w-6 rounded-full'
                src={images.homeLogo}
                alt='logo'
                onClick={() => navigate(path.product)}
              />
              <Link to='/' className='text-[14px] font-medium leading-normal text-[#0a68ff]'>
                {t('home page')}
              </Link>
            </div>

            <Tooltip
              title={
                <div className='w-[120px] cursor-pointer'>
                  <div
                    className={`rounded p-2 transition ${
                      currentLanguage === 'vi' ? 'bg-slate-500 text-white' : 'text-black'
                    }`}
                    onClick={() => changeLanguage('vi')}
                  >
                    Tiếng Việt
                  </div>
                  <div
                    className={`rounded p-2 transition ${
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
              <div className='flex w-[124px] cursor-pointer items-center rounded-lg py-2 px-4 hover:bg-[#27272a1f]'>
                <GlobalIcon className='mr-1 h-6 w-6 cursor-pointer text-[#808089] ' />
                <Link to='' className='text-[14px] font-normal leading-normal text-[#808089]'>
                  {locales[currentLanguage]}
                </Link>
              </div>
            </Tooltip>

            {profile?.email ? (
              <Tooltip
                title={
                  <>
                    <div
                      className='rounded py-2 px-2 text-black transition hover:cursor-pointer hover:bg-slate-500 hover:text-white'
                      onClick={() => navigate(path.profile)}
                    >
                      {t('customer information')}
                    </div>

                    {profile?.isAdmin && (
                      <div
                        className='rounded py-2 px-2 text-black transition hover:cursor-pointer hover:bg-slate-500 hover:text-white'
                        onClick={() => navigate(path.adminUser)}
                      >
                        {t('system management')}
                      </div>
                    )}

                    <div
                      className='rounded py-2 px-2 text-black transition hover:cursor-pointer hover:bg-slate-500 hover:text-white'
                      onClick={handleLogout}
                    >
                      {t('logout')}
                    </div>
                  </>
                }
                color='white'
              >
                <div className='flex cursor-pointer items-center rounded-lg py-2 px-4 hover:bg-[#27272a1f]'>
                  <Image
                    className='mr-1 h-[24px] w-[24px] rounded-full object-cover'
                    alt='image'
                    src={profile?.avatar || ''}
                  />
                  <Link to='' className='text-[14px] font-normal leading-normal text-[#808089]'>
                    {t('account')}
                  </Link>
                </div>
              </Tooltip>
            ) : (
              <div
                className='flex cursor-pointer items-center rounded-lg py-2 px-4 hover:bg-[#27272a1f]'
                // onClick={() => navigate(path.login)}
              >
                <UserOutlined className='text-[20px]' />
                <Link to={path.login} className='text-[14px] font-normal leading-normal text-[#808089]'>
                  {t('account')}
                </Link>
              </div>
            )}

            <Link
              to={path.order}
              className='ml-6 flex cursor-pointer items-end gap-[8px] rounded p-2 text-white hover:bg-[#0060ff1f]'
            >
              <div className='relative before:absolute before:-left-3 before:block before:h-5 before:border-[1px] before:border-solid before:border-[#ebebf0] before:content-[""]'>
                <Image className='h-[24px] w-[24px]' alt='image' src={images.cartIcon} />
                <span className='absolute -top-[10px] -right-1 inline-block h-[16px] rounded-lg bg-[#ff424f] py-[0.5px] px-1 text-center text-[10px] font-bold leading-normal text-white'>
                  0
                </span>
              </div>
            </Link>
          </div>
        </div>

        <div className='flex justify-between'>
          <div className='ml-[105px] mt-2 flex'>
            {quickLinks.map((item) => (
              <span
                className='mr-3 whitespace-nowrap text-[14px] font-normal leading-normal text-[#808089]'
                key={item.id}
              >
                {item.content}
              </span>
            ))}
          </div>

          <div className='mt-2 w-[348px]'>
            <div className='flex items-center justify-end'>
              <Image className='mr-1 h-[20px] w-[20px]' alt='image' src={images.locationIcon} />
              <h4 className='whitespace-nowrap pr-1 text-[14px] font-normal leading-normal text-[#808089]'>
                Giao đến:
              </h4>
              <div className='overflow-hidden whitespace-nowrap text-[14px] font-medium leading-normal text-[#27272a] underline'>
                Q. Tân Bình, P. 04, Hồ Chí Minh
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
