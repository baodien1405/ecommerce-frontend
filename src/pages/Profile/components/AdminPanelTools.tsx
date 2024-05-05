import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import {
  CreditCardSolidIcon,
  MoonSolidIcon,
  ScrewdriverWrenchSolidIcon,
  ShieldCheckSolidIcon,
  SlidersIcon,
  SunSolidIcon,
  WindowSolidIcon
} from '@/components/Icons'
import { useTheme } from '@/contexts'

export function AdminPanelTools() {
  const [t] = useTranslation('profile')

  const { theme, toggleTheme } = useTheme()
  const TOOL_LIST = [
    {
      url: '/connected-apps',
      icon: <WindowSolidIcon />,
      label: 'Connected Apps',
      isShowSubHeading: true
    },
    {
      url: '/connected-apps',
      icon: <CreditCardSolidIcon />,
      label: 'Payment Methods'
    },
    {
      url: '/connected-apps',
      icon: <ScrewdriverWrenchSolidIcon />,
      label: 'Appearance'
    },
    {
      url: '/connected-apps',
      icon: <ShieldCheckSolidIcon />,
      label: 'Security Assets'
    },
    {
      url: '/connected-apps',
      icon: <SlidersIcon />,
      label: 'Configuration Settings'
    }
  ]

  return (
    <div>
      <h5>{t('ADMIN_PANEL_TOOLS')}</h5>
      <div className='mt-5 grid gap-4 md:mt-8 md:grid-cols-2 md:gap-x-[50px] md:gap-y-8 lg:max-w-[780px] lg:grid-cols-3'>
        {TOOL_LIST.map((tool, index) => (
          <Link className='tool-btn' to={tool.url} key={index}>
            <span className='icon-wrapper text-accent'>{tool.icon}</span>
            <span>
              {tool.label} {tool.isShowSubHeading && <span className='subheading-2'>(12)</span>}
            </span>
          </Link>
        ))}

        <button className='tool-btn' aria-label='Change theme' onClick={toggleTheme}>
          <span className='icon-wrapper text-accent'>{theme === 'light' ? <SunSolidIcon /> : <MoonSolidIcon />}</span>
          {t('VIEW_MODE')}
        </button>
      </div>
    </div>
  )
}
