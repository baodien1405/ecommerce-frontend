import { useWindowSize } from 'react-use'

import images from '@/assets/images'
import Image from '@/components/Image'
import Logo from '@/components/Logo'
import { useTranslation } from 'react-i18next'

interface AuthLayoutProps {
  children?: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { width } = useWindowSize()
  const [t] = useTranslation('layout')

  return (
    <div className='4xl:grid-cols-[minmax(0,_1030px)_minmax(0,_1fr)] grid flex-1 grid-cols-1 lg:grid-cols-2'>
      {width >= 1024 && (
        <div className='flex flex-col items-center justify-center lg:p-[60px]'>
          <Logo imgClass='w-[40px]' textClass='text-[28px]' />

          <p className='mx-auto my-7 max-w-[540px] text-center text-lg font-semibold leading-6 tracking-[0.2px]'>
            {t('AUTH_LAYOUT.INTRO')}
          </p>

          <Image className='max-w-[780px]' alt='media' src={images.media} />
        </div>
      )}

      {children}
    </div>
  )
}
