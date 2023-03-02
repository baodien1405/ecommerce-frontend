import { UserOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
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

export default function AdminHeader() {
  const navigate = useNavigate()
  const [t, i18n] = useTranslation('header')
  const { profile, reset } = useContext(AppContext)
  const currentLanguage = i18n.language as 'en' | 'vi'

  const changeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
  }

  const handleLogout = () => {
    reset()
    clearLS()
  }

  return (
    <div className='mb-[1px] py-2 shadow'>
      <div className='container w-full'>
        <div className='flex items-center justify-between'>
          <div className='mr-12'>
            <Image src={images.blueLogo} alt='logo' className='w-[60px]' onClick={() => navigate(path.product)} />
          </div>

          <div className='ml-12 flex items-center'>
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
                      onClick={handleLogout}
                    >
                      {t('logout')}
                    </div>
                    <div
                      className='rounded py-2 px-2 text-black transition hover:cursor-pointer hover:bg-slate-500 hover:text-white'
                      onClick={() => navigate(path.profile)}
                    >
                      {t('customer information')}
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
                onClick={() => navigate(path.login)}
              >
                <UserOutlined className='text-[20px]' />
                <Link to='' className='text-[14px] font-normal leading-normal text-[#808089]'>
                  {t('account')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
