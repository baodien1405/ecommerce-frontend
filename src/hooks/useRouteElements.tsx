import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { path } from '@/constants'
import { AppContext } from '@/contexts'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ProductDetail from '@/pages/ProductDetail'
import ProductList from '@/pages/ProductList'
import Profile from '@/pages/Profile'
import NotFound from '@/pages/NotFound'
import ProductType from '@/pages/ProductType'
import { AdminLayout, DefaultLayout, MainLayout } from '@/layouts'
import { AdminProduct, AdminUser, AdminUserTrash } from '@/pages/Admin/pages'

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
      path: path.productType,
      index: true,
      element: (
        <MainLayout>
          <ProductType />
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
          path: path.adminUser,
          element: (
            <AdminLayout>
              <AdminUser />
            </AdminLayout>
          )
        },
        {
          path: path.adminProduct,
          element: (
            <AdminLayout>
              <AdminProduct />
            </AdminLayout>
          )
        },
        {
          path: path.adminUserTrash,
          element: (
            <AdminLayout>
              <AdminUserTrash />
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
