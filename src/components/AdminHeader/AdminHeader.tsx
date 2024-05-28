import { UserOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import images from '@/assets/images'
import Image from '@/components/Image'
import { path } from '@/constants'
import { AppContext } from '@/contexts'
import { clearLS } from '@/utils'

export default function AdminHeader() {
  const navigate = useNavigate()
  const [t] = useTranslation('header')
  const { profile, reset } = useContext(AppContext)

  const handleLogout = () => {
    reset()
    clearLS()
  }

  return (
    <div className='h-[58px] py-2 shadow'>
      <div className='container w-full'>
        <div className='flex items-center justify-between'>
          <div className='mr-12'>
            <Image
              src={images.blueLogo}
              alt='logo'
              className='w-[60px] cursor-pointer'
              onClick={() => navigate(path.productGrid)}
            />
          </div>

          {profile?.email ? (
            <Tooltip
              title={
                <>
                  <div
                    className='rounded px-2 py-2 text-black transition hover:cursor-pointer hover:bg-slate-500 hover:text-white'
                    onClick={handleLogout}
                  >
                    {t('logout')}
                  </div>
                  <div
                    className='rounded px-2 py-2 text-black transition hover:cursor-pointer hover:bg-slate-500 hover:text-white'
                    onClick={() => navigate(path.profile)}
                  >
                    {t('customer information')}
                  </div>
                </>
              }
              color='white'
            >
              <div className='flex cursor-pointer items-center rounded-lg px-4 py-2 hover:bg-[#27272a1f]'>
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
              className='flex cursor-pointer items-center rounded-lg px-4 py-2 hover:bg-[#27272a1f]'
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
  )
}
