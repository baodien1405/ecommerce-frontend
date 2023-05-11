import { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { path } from '@/constants'
import { AdminLayout, DefaultLayout, MainLayout } from '@/layouts'
import { AdminProduct, AdminProductDraft, AdminProductPublished, AdminUser, AdminUserTrash } from '@/pages/Admin/pages'
import { AdminRoute, ProtectedRoute, RejectedRoute } from './permissions'
import Spinner from '@/components/Spinner'

const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const ProductList = lazy(() => import('@/pages/ProductList'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail'))
const ProductType = lazy(() => import('@/pages/ProductType'))
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
            <DefaultLayout>
              <Suspense fallback={<Spinner />}>
                <Login />
              </Suspense>
            </DefaultLayout>
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
      path: path.productType,
      index: true,
      element: (
        <MainLayout>
          <Suspense fallback={<Spinner />}>
            <ProductType />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '',
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
        // {
        //   path: path.adminProduct,
        //   element: (
        //     <AdminLayout>
        //       <AdminProduct />
        //     </AdminLayout>
        //   )
        // },
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
      path: '*',
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
