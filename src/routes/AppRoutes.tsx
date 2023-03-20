import { useRoutes } from 'react-router-dom'
import { path } from '@/constants'
import { AdminLayout, DefaultLayout, MainLayout } from '@/layouts'
import { AdminProduct, AdminUser, AdminUserTrash } from '@/pages/Admin/pages'
import { AdminRoute, ProtectedRoute, RejectedRoute } from './permissions'

import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ProductList from '@/pages/ProductList'
import ProductDetail from '@/pages/ProductDetail'
import ProductType from '@/pages/ProductType'
import Profile from '@/pages/Profile'
import NotFound from '@/pages/NotFound'

export default function AppRoutes() {
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
