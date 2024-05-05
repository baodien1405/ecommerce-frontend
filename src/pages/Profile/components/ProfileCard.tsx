import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

import Spring from '@/components/Spring'
import Button from '@/components/Button'
import Image from '@/components/Image'
import { CameraSolidIcon } from '@/components/Icons'
import { User } from '@/types'
import { convertTitleCase } from '@/utils'

interface ProfileCardProps {
  profile: User | null
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const [t] = useTranslation(['common'])

  return (
    <Spring type='fade' className='card flex flex-col items-center justify-center' id='userProfileCard'>
      <div className='relative mb-3.5'>
        <Image
          className='relative h-[110px] w-[110px] rounded-full'
          src={
            profile?.avatar ||
            'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww'
          }
          alt='Maria Smith'
        />

        <button
          className='absolute bottom-0 right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full
                        border-[3px] border-solid border-widget bg-green text-widget transition hover:bg-green-darker'
          aria-label='Change profile picture'
        >
          <CameraSolidIcon width='20px' height='20px' />
        </button>
      </div>

      <h4>{profile?.name}</h4>

      <span className='badge badge--square mt-2.5 min-w-[96px] bg-red'>
        {convertTitleCase(profile?.roles?.[0] || '')}
      </span>

      <p className='subheading-2 mb-[18px] mt-6'>last visit {dayjs().format('DD/MM/YYYY')}</p>

      <Button variant='secondary' size='large' className='mx-auto w-full md:max-w-[280px]'>
        {t('common:LOG_OUT')}
      </Button>
    </Spring>
  )
}
