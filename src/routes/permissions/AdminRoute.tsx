import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { AppContext } from '@/contexts'
import NotFound from '@/pages/NotFound'

export function AdminRoute() {
  const { isAuthenticated, profile } = useContext(AppContext)
  return isAuthenticated && profile?.isAdmin ? <Outlet /> : <NotFound />
}
