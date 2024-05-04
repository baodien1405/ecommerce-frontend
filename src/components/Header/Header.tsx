import { Tooltip } from 'antd'
import cn from 'classnames'
import { useState } from 'react'
import Headroom from 'react-headroom'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useWindowSize } from 'react-use'

import { BellSolidIcon, MenuIcon, MessageSolidIcon, MoonIcon, SearchIcon, SunIcon, UserIcon } from '@/components/Icons'
import Image from '@/components/Image'
import LocaleMenu from '@/components/LocalMenu'
import Search from '@/components/Search'
import { LOCALES, path } from '@/constants'
import { useTheme } from '@/contexts'

export default function Header() {
  const navigate = useNavigate()
  const { width } = useWindowSize()
  const { i18n } = useTranslation('header')
  const { theme, toggleTheme } = useTheme()
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false)
  const [messagesPanelOpen, setMessagesPanelOpen] = useState(false)

  const currentLanguage = i18n.language as 'en' | 'vi'
  const currentLocal = LOCALES.find((x) => x.value === currentLanguage) || LOCALES[0]

  const changeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className='p-[15px] 3xl:p-[26px]'>
      <Headroom style={{ zIndex: 999 }}>
        <div className='flex items-center justify-between'>
          {width < 1920 && (
            <MenuIcon
              width='30px'
              height='30px'
              className='text-2xl leading-none text-accent hover:cursor-pointer'
              onClick={() => {}}
            />
          )}

          {width >= 768 && <Search wrapperClass='flex-1 max-w-[1054px] ml-5 mr-auto 4xl:ml-0' />}

          <div className='flex items-center gap-5 md:ml-5 xl:gap-[26px]'>
            {width < 768 && (
              <SearchIcon
                width='20px'
                height='20px'
                className='absolute !right-[80px] top-1/2 -translate-y-1/2 leading-[0] text-accent hover:cursor-pointer'
                onClick={() => setSearchModalOpen(true)}
              />
            )}

            <button aria-label='Change theme' onClick={toggleTheme}>
              {theme === 'light' ? <SunIcon /> : <MoonIcon />}
            </button>

            <Tooltip
              color='var(--widget)'
              overlayInnerStyle={{ padding: 0 }}
              title={<LocaleMenu currentLanguage={currentLanguage} changeLanguage={changeLanguage} />}
            >
              <button className='h-6 w-6 overflow-hidden rounded-full xl:h-8 xl:w-8' aria-label='Change language'>
                <Image src={currentLocal.icon} alt={currentLocal.label} className='h-full w-full object-cover' />
              </button>
            </Tooltip>

            <div className='relative mt-1.5 h-fit xl:mr-1.5 xl:mt-0 xl:self-end'>
              <BellSolidIcon
                className='dark:text-gray-red text-lg leading-none text-gray xl:text-[20px]'
                onClick={() => setNotificationsPanelOpen(true)}
              />

              <span className='absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full border-[2px] border-body bg-red xl:-right-4 xl:-top-5 xl:flex xl:h-6 xl:w-6 xl:items-center xl:justify-center'>
                <span
                  className={cn('hidden text-xs font-bold xl:block', {
                    'text-white': theme === 'light',
                    'text-[#00193B]': theme === 'dark'
                  })}
                >
                  7
                </span>
              </span>
            </div>

            <div className='relative mt-1.5 h-fit xl:mr-1.5 xl:mt-0 xl:self-end'>
              <MessageSolidIcon
                className='dark:text-gray-red text-lg leading-none text-gray xl:text-[20px]'
                onClick={() => setMessagesPanelOpen(true)}
              />

              <span
                className='absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full border-[2px] border-body bg-green
                      xl:-right-4 xl:-top-5 xl:flex xl:h-6 xl:w-6 xl:items-center xl:justify-center'
              >
                <span
                  className={cn('hidden text-xs font-bold xl:block', {
                    'text-white': theme === 'light',
                    'text-[#00193B]': theme === 'dark'
                  })}
                >
                  2
                </span>
              </span>
            </div>

            <div className='relative'>
              <button
                className='relative flex h-8 w-8 items-center justify-center rounded-full bg-accent
              text-sm text-widget xl:h-11 xl:w-11 xl:text-lg'
              >
                <UserIcon onClick={() => navigate(path.profile)} />
              </button>

              <span className='absolute bottom-0 right-0 z-10 block h-[9px] w-[9px] rounded-full border-[2px] border-solid border-body bg-green xl:h-3 xl:w-3' />
            </div>
          </div>
        </div>
      </Headroom>
    </div>
  )
}
