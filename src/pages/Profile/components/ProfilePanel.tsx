import { useTranslation } from 'react-i18next'

import { BellSolidIcon, MessageSolidIcon } from '@/components/Icons'
import Spring from '@/components/Spring'

export const ProfilePanel = () => {
  const [t] = useTranslation('profile')

  return (
    <Spring type='fade' className='card flex flex-col justify-center gap-5' id='userProfilePanel'>
      <button className='flex w-fit items-center gap-4'>
        <span className='icon-wrapper'>
          <BellSolidIcon className='text-lg leading-none text-red xl:text-[20px]' />
        </span>

        <span>
          {t('NOTIFICATIONS')} <span className='subheading-2'>(2)</span>
        </span>
      </button>

      <button className='flex w-fit items-center gap-4'>
        <span className='icon-wrapper'>
          <MessageSolidIcon className='text-lg leading-none text-green xl:text-[20px]' />
        </span>

        <span>
          {t('MESSAGES')} <span className='subheading-2'>(7)</span>
        </span>
      </button>
    </Spring>
  )
}
