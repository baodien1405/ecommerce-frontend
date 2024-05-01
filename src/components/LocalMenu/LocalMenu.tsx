import Image from '@/components/Image'
import { LOCALES } from '@/constants'

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

export default LocaleMenu
