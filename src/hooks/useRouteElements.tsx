import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { path } from '@/constants'
import { AppContext } from '@/contexts'
import MainLayout from '@/layouts/MainLayout'
import DefaultLayout from '@/layouts/DefaultLayout'

import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ProductDetail from '@/pages/ProductDetail'
import ProductList from '@/pages/ProductList'
import Profile from '@/pages/Profile'
import NotFound from '@/pages/NotFound'
import AdminLayout from '@/layouts/AdminLayout'
import Admin from '@/pages/Admin'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='*' />
}

function AdminRoute() {
  const { isAuthenticated, profile } = useContext(AppContext)
  return isAuthenticated && profile?.isAdmin ? <Outlet /> : <NotFound />
}

export function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <DefaultLayout>
              <Login />
            </DefaultLayout>
          )
        },
        {
          path: path.register,
          element: (
            <DefaultLayout>
              <Register />
            </DefaultLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: path.productDetail,
      index: true,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <AdminRoute />,
      children: [
        {
          path: path.systemAdmin,
          element: (
            <AdminLayout>
              <Admin />
            </AdminLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ])
  return routeElements
}
