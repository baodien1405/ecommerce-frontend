import { Drawer } from 'antd'
import { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import { useSidebar } from '@/contexts'
import Logo from '@/components/Logo'
import { ROUTES } from '@/constants'

export default function Sidebar() {
  const { open, setOpen } = useSidebar()
  const [active, setActive] = useState('Dashboard')

  return (
    <Drawer
      title={<Logo />}
      headerStyle={{ padding: '35px 27px 30px' }}
      bodyStyle={{ padding: '0px 27px 35px' }}
      maskStyle={{ background: 'var(--backdrop)', opacity: 0.8 }}
      closable={false}
      onClose={() => setOpen(false)}
      open={open}
      placement='left'
      className='!bg-widget'
      autoFocus={false}
    >
      <nav className='menu'>
        {ROUTES.map((route, index) => {
          return (
            <Fragment key={route.name}>
              {route.links && (
                <>
                  <div>
                    <div
                      className={cn('menu-item', {
                        active: active === route.name
                      })}
                      onClick={() => setActive(active === route.name ? '' : route.name)}
                    >
                      <div className='flex items-center gap-2.5'>
                        <i className={`icon icon-${route.icon}`} />
                        <span className='text'>{route.name}</span>
                      </div>

                      <button className='xl:hidden 4xl:block' aria-label='Toggle submenu'>
                        <i className='icon icon-caret-right-solid' />
                      </button>
                    </div>

                    {/* <Collapse in={active === route.name} timeout='auto' unmountOnExit>
                      <div className='submenu flex flex-col gap-2.5'>
                        {route.links.map((link) => {
                          return (
                            <NavLink className='submenu_item menu_item' to={link.path} key={link.name}>
                              <span className='flex items-center gap-2.5'>
                                <i className='icon icon-circle-solid' />
                                <span>{link.name}</span>
                              </span>
                            </NavLink>
                          )
                        })}
                      </div>
                    </Collapse> */}
                  </div>
                  {index === ROUTES.length - 2 && <span className='menu-divider' />}
                </>
              )}

              {!route.links && (
                <>
                  <NavLink className='menu-item' to={route.path}>
                    <div className='flex items-center gap-2.5'>
                      <i className={`icon icon-${route.icon}`} />
                      <span className='text'>{route.name}</span>
                    </div>
                    {route.qty && <span className='badge rounded bg-green xl:hidden'>{route.qty}</span>}
                  </NavLink>

                  {index === ROUTES.length - 2 && <span className='menu-divider' />}
                </>
              )}
            </Fragment>
          )
        })}
      </nav>
    </Drawer>
  )
}
