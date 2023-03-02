import { Menu } from 'antd'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface MenuItem {
  code: string
  label: string
  icon?: ReactNode
  path: string
  children?: MenuItem[]
}

export type MenuList = MenuItem[]

export interface AsideMenuProps {
  menuList: MenuList
  openKey?: string
  onChangeOpenKey: (key?: string) => void
  selectedKey: string
  onChangeSelectedKey: (key: string) => void
}

export function AsideMenu({ menuList, openKey, onChangeOpenKey, selectedKey, onChangeSelectedKey }: AsideMenuProps) {
  const navigate = useNavigate()

  const getTitle = (menu: MenuItem) => {
    return (
      <span className='flex items-center'>
        {menu.icon}
        <span>{menu.label}</span>
      </span>
    )
  }

  const onMenuClick = (path: string) => {
    onChangeSelectedKey(path)
    navigate(path)
  }

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop()
    onChangeOpenKey(key)
  }

  return (
    <Menu
      theme='dark'
      mode='inline'
      selectedKeys={[selectedKey]}
      openKeys={openKey ? [openKey] : []}
      onOpenChange={onOpenChange}
      onSelect={(k) => onMenuClick(k.key)}
      className='text-2 h-[calc(100vh-65px)] w-[300px] border-r-0'
      items={menuList.map((menu) => {
        return menu.children
          ? {
              key: menu.code,
              label: getTitle(menu),
              children: menu.children.map((child) => ({
                key: child.path,
                label: child.label
              }))
            }
          : {
              key: menu.path,
              label: getTitle(menu)
            }
      })}
    />
  )
}
