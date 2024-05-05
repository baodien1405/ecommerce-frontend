import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useWindowSize } from 'react-use'
import { useTranslation } from 'react-i18next'

import { ArrowPathIcon } from '@/components/Icons'

interface PageHeaderProps {
  title: string
}

export default function PageHeader({ title }: PageHeaderProps) {
  const [t] = useTranslation('common')
  const { width } = useWindowSize()
  const [currentTime, setCurrentTime] = useState(new Date())
  const dateFormat = width < 768 ? 'MM.DD.YYYY' : 'MMMM DD, YYYY'

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [currentTime])

  return (
    <div
      className='card no-hover mb-5 flex flex-col gap-5 md:mb-[26px] md:!p-[26px] lg:flex-row lg:items-center
    lg:gap-4 lg:!py-5'
    >
      <h1 className='flex-1 text-center lg:text-left'>{title}</h1>
      <button
        className='group hidden w-fit items-center gap-2 font-heading text-sm font-semibold
           text-header xl:flex'
      >
        {t('DATA_REFRESH')}
        <ArrowPathIcon className='text-accent group-hover:animate-spin-slow' />
      </button>
      <div
        className='flex h-11 items-center justify-center rounded-md border border-input-border bg-body px-9
       font-heading text-sm font-bold text-header lg:w-[310px]'
      >
        {dayjs(currentTime).format(`${dateFormat} HH`)}
        <span className='animate-pulse-fast'>:</span>
        {dayjs(currentTime).format('mm A')}
      </div>
    </div>
  )
}
