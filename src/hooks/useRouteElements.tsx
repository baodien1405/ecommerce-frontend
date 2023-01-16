import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { path } from '@/constants'
import MainLayout from '@/layouts/MainLayout'
import DefaultLayout from '@/layouts/DefaultLayout'

import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ProductDetail from '@/pages/ProductDetail'
import ProductList from '@/pages/ProductList'
import Profile from '@/pages/Profile'

function ProtectedRoute() {
  const isAuthenticated = true
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  // const { isAuthenticated } = useContext(AppContext)
  const isAuthenticated = false
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
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
    }
  ])
  return routeElements
}
