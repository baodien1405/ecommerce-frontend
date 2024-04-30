import { useMutation } from '@tanstack/react-query'
import { Tooltip } from 'antd'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import authApi from '@/api/auth.api'
import images from '@/assets/images'
import { BellSolidIcon, MenuIcon, MessageSolidIcon, MoonIcon, SearchIcon, SunIcon, UserIcon } from '@/components/Icons'
import Image from '@/components/Image'
import Search from '@/components/Search'
import { AppContext, useTheme } from '@/contexts'
import { useSearchProducts } from '@/hooks'
import { clearLS } from '@/utils'
import Headroom from 'react-headroom'
import { useWindowSize } from 'react-use'

export const LOCALES = [
  { value: 'en', label: 'English (EN)', icon: images.usFlag },
  { value: 'vi', label: 'Vietnam (VN)', icon: images.vnFlag }
] as const

const LocaleMenu = ({
  currentLanguage,
  changeLanguage
}: {
  currentLanguage: 'en' | 'vi'
  changeLanguage: (lang: 'en' | 'vi') => void
}) => {
  return (
    <div className='flex flex-col gap-4 p-4'>
      {LOCALES.map((locale) => (
        <button
          key={locale.value}
          className='group flex w-fit items-center gap-2.5'
          onClick={() => changeLanguage(locale.value)}
        >
          <Image className='h-5 w-5 rounded-full' src={locale.icon} alt={locale.label} />
          <span
            className={`text-sm font-medium transition group-hover:text-accent ${
              currentLanguage === locale.value ? 'text-accent' : 'text-header'
            }`}
          >
            {locale.label}
          </span>
        </button>
      ))}
    </div>
  )
}

export default function Header() {
  const navigate = useNavigate()
  const { width } = useWindowSize()
  const { profile, reset, isAuthenticated } = useContext(AppContext)
  const { onSubmitSearch } = useSearchProducts()
  const [t, i18n] = useTranslation('header')
  const currentLanguage = i18n.language as 'en' | 'vi'
  const currentLocal = LOCALES.find((x) => x.value === currentLanguage) || LOCALES[0]
  const { theme, toggleTheme } = useTheme()
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false)
  const [messagesPanelOpen, setMessagesPanelOpen] = useState(false)

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      reset()
      clearLS()
    }
  })

  const handleSearch = (value: string) => {
    onSubmitSearch({
      name: value.toLowerCase()
    })
  }

  const changeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
  }

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <Headroom style={{ zIndex: 999 }}>
      <div className='flex items-center justify-between px-20'>
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
            // <button
            //   className='dark:text-gray-red text-[20px] leading-none text-gray xl:text-2xl'
            //   aria-label='Open search'
            //   // onClick={() => setSearchModalOpen(true)}
            // >
            //   <i className='icon-magnifying-glass-solid' />
            // </button>

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
            open={true}
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
              <span className='hidden text-xs font-bold text-white dark:text-[#00193B] xl:block'>7</span>
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
              <span className='hidden text-xs font-bold text-white dark:text-[#00193B] xl:block'>2</span>
            </span>
          </div>

          <div className='relative'>
            <UserIcon
              className='relative flex h-4 w-4 items-center justify-center rounded-full bg-accent
            text-sm text-widget xl:h-11 xl:w-11 xl:text-lg'
              onClick={() => navigate('/general-settings')}
            />

            <span className='absolute bottom-0 right-0 z-10 block h-[9px] w-[9px] rounded-full border-[2px] border-solid border-body bg-green xl:h-3 xl:w-3' />
          </div>
        </div>
      </div>
    </Headroom>
  )
}
