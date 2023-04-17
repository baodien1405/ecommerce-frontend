import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { AppContext } from '@/contexts'
import NotFound from '@/pages/NotFound'
import { Roles } from '@/constants'

export function AdminRoute() {
  const { isAuthenticated, profile } = useContext(AppContext)
  return isAuthenticated && profile?.roles.includes(Roles.ADMIN) ? <Outlet /> : <NotFound />
}
