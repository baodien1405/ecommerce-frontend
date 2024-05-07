import { useTranslation } from 'react-i18next'

import Button from '@/components/Button'
import { GithubIcon, GoogleIcon } from '@/components/Icons'

export default function SocialButtonGroup() {
  const [t] = useTranslation('common')

  return (
    <div className='grid grid-cols-1 gap-4 2xs:grid-cols-2 xs:gap-[30px]'>
      <Button variant='social' size='large' htmlType='button' className='mx-auto w-full'>
        <GoogleIcon />
        {t('LOGIN_WITH_GOOGLE')}
      </Button>

      <Button variant='social' size='large' htmlType='button' className='mx-auto w-full'>
        <GithubIcon className='text-accent' />
        {t('LOGIN_WITH_GITHUB')}
      </Button>
    </div>
  )
}
