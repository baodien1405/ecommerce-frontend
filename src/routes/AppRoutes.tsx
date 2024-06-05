import { lazy, Suspense } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import { path } from '@/constants'
import { AdminLayout, DefaultLayout, MainLayout } from '@/layouts'
import { AdminProductDraft, AdminProductPublished, AdminUser, AdminUserTrash } from '@/pages/Admin/pages'
import { AdminRoute, ProtectedRoute, RejectedRoute } from './permissions'
import Spinner from '@/components/Spinner'

const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const ProductList = lazy(() => import('@/pages/ProductList'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail'))
const AddEditProduct = lazy(() => import('@/pages/AddEditProduct'))
const Profile = lazy(() => import('@/pages/Profile'))
const Order = lazy(() => import('@/pages/Order'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function AppRoutes() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <Suspense fallback={<Spinner />}>
              <Login />
            </Suspense>
          )
        },
        {
          path: path.register,
          element: (
            <DefaultLayout>
              <Suspense fallback={<Spinner />}>
                <Register />
              </Suspense>
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
              <Suspense fallback={<Spinner />}>
                <Profile />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.order,
          element: (
            <MainLayout>
              <Suspense fallback={<Spinner />}>
                <Order />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.addEditProduct,
          element: (
            <MainLayout>
              <Suspense fallback={<Spinner />}>
                <AddEditProduct />
              </Suspense>
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
          <Suspense fallback={<Spinner />}>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.productGrid,
      index: true,
      element: (
        <MainLayout>
          <Suspense fallback={<Spinner />}>
            <ProductList />
          </Suspense>
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
          path: path.adminProductDraft,
          element: (
            <AdminLayout>
              <AdminProductDraft />
            </AdminLayout>
          )
        },
        {
          path: path.adminProductPublished,
          element: (
            <AdminLayout>
              <AdminProductPublished />
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
      path: path.home,
      index: true,
      element: <Navigate to={path.productGrid} />
    },
    {
      path: path.notFound,
      element: <Navigate to='/404' />
    },
    {
      path: '/404',
      element: (
        <MainLayout>
          <Suspense fallback={<Spinner />}>
            <NotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ])

  return routeElements
}
