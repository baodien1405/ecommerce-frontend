import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { createSearchParams, useNavigate } from 'react-router-dom'

import productApi from '@/api/product.api'
import { useQueryConfig } from '@/hooks'
import { ProductFiltersPayload, ProductListConfig } from '@/types'
import PageHeader from '@/components/PageHeader'
import Pagination from '@/components/Pagination'
import { path } from '@/constants'
import { ProductFilters, ProductListGrid } from '@/pages/ProductList/components'
import CategoryHeader from '@/components/CategoryHeader'

export default function ProductList() {
  const [t] = useTranslation('productList')
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()

  const productsQuery = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      const controller = new AbortController()

      setTimeout(() => {
        controller.abort()
      }, 10000)

      return productApi.getProductList(queryConfig as ProductListConfig, controller.signal)
    }
  })

  const productList = productsQuery.data?.data.metadata.items || []
  const { page, limit, totalRows } = productsQuery.data?.data.metadata.pagination || {
    page: 1,
    limit: 10,
    totalRows: 0
  }
  const totalPages = totalRows ? Math.ceil(totalRows / limit) : 0

  const handleFiltersChange = (payload: ProductFiltersPayload) => {
    navigate({
      pathname: path.productGrid,
      search: createSearchParams({
        _page: String(page),
        _limit: queryConfig.limit || '',
        sort_by: 'price',
        ...payload
      }).toString()
    })
  }

  const handlePageChange = (page: number) => {
    navigate({
      pathname: path.productGrid,
      search: createSearchParams({
        _page: String(page),
        _limit: queryConfig.limit || ''
      }).toString()
    })
  }

  return (
    <div>
      <Helmet>
        <title>Products | ShopFood</title>
        <meta name='description' content='Products' />
      </Helmet>

      <div className='px-[15px] 3xl:px-[26px]'>
        <PageHeader title={t('PRODUCTS_TITLE')} />

        <div className='grid gap-[26px] lg:grid-cols-4 2xl:grid-cols-6'>
          <div className='card flex min-w-[218px] items-center gap-4 !p-5'>
            <CategoryHeader category={queryConfig.category || 'electronics'} />
          </div>

          <div className='flex flex-col-reverse gap-4 lg:col-start-3 lg:col-end-5 lg:flex-col lg:gap-3 2xl:col-start-5 2xl:col-end-7'>
            <span className='lg:text-right'>
              View products: {productList.length}/{totalRows}
            </span>

            <ProductFilters
              initialValues={{ category: queryConfig.category || 'electronics', order: queryConfig.order || 'asc' }}
              onSubmit={handleFiltersChange}
            />
          </div>
        </div>

        <ProductListGrid loading={productsQuery.isLoading} productList={productList} />

        <Pagination page={page} count={totalPages} onChange={handlePageChange} />
      </div>
    </div>
  )
}
