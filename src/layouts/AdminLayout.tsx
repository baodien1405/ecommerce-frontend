import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons'

import AdminHeader from '@/components/AdminHeader'
import { AsideMenu } from '@/pages/Admin/components'
import { path } from '@/constants'

interface AdminLayoutProps {
  children?: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation()
  const [openKey, setOpenKey] = useState<string>()
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname)

  const menuList = [
    {
      code: '1',
      label: 'User',
      icon: <UserOutlined />,
      path: path.adminUser
    },
    {
      code: '2',
      label: 'Product',
      icon: <AppstoreOutlined />,
      path: path.adminProduct
    }
  ]

  return (
    <div>
      <AdminHeader />
      <div className='container flex'>
        <AsideMenu
          menuList={menuList}
          openKey={openKey}
          onChangeOpenKey={(k) => setOpenKey(k)}
          selectedKey={selectedKey}
          onChangeSelectedKey={(k) => {
            setSelectedKey(k)
          }}
        />
        <div className='flex-1'>{children}</div>
      </div>
    </div>
  )
}
