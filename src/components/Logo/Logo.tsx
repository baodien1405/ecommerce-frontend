import { NavLink } from 'react-router-dom'
import { memo } from 'react'
import classNames from 'classnames'

import Image from '@/components/Image'
import svgs from '@/assets/svgs'
import { useTheme } from '@/contexts'

interface LogoProps {
  imgClass?: string
  textClass?: string
}

const Logo = ({ imgClass, textClass }: LogoProps) => {
  const { theme } = useTheme()

  return (
    <NavLink className='inline-flex items-center gap-3' to='/'>
      <span className={classNames('relative w-10', imgClass)}>
        <Image alt='ShopFood' src={svgs.logoLight} />
        <Image
          className={classNames('absolute left-0 top-0', {
            hidden: theme === 'light'
          })}
          alt='ShopFood'
          src={svgs.logoDark}
        />
      </span>

      <h4 className={textClass}>ShopFood</h4>
    </NavLink>
  )
}

export default memo(Logo)
