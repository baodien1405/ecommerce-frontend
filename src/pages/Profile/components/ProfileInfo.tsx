import { useMemo } from 'react'

import {
  DevicePhoneSolidIcon,
  FileDownloadSolidIcon,
  LocationSolidIcon,
  MailSolidIcon,
  PhoneSolidIcon
} from '@/components/Icons'
import Spring from '@/components/Spring'

export const ProfileInfo = () => {
  const PROFILE_INFO_LIST = useMemo(() => {
    return [
      {
        icon: <MailSolidIcon />,
        label: 'maria@email.com'
      },
      {
        icon: <LocationSolidIcon />,
        label: '312 3rd St, Albany, New York 12206, USA'
      },
      {
        icon: <DevicePhoneSolidIcon />,
        label: '+1 123-123-123'
      },
      {
        icon: <PhoneSolidIcon />,
        label: '+1 123-123-123'
      },
      {
        icon: <FileDownloadSolidIcon />,
        label: 'Profile Information File'
      }
    ]
  }, [])

  return (
    <Spring type='fade' className='card flex items-center'>
      <div className='flex flex-col gap-5'>
        {PROFILE_INFO_LIST.map((item, index) => (
          <div key={index} className='flex items-center gap-4'>
            <span className='icon-wrapper text-accent'>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
    </Spring>
  )
}
