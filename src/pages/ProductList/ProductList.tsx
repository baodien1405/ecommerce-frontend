import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { createSearchParams, useNavigate } from 'react-router-dom'

import productApi from '@/api/product.api'
import { useQueryConfig } from '@/hooks'
import { ProductListConfig } from '@/types'
import PageHeader from '@/components/PageHeader'
import Pagination from '@/components/Pagination'
import { path } from '@/constants'
import { ProductListGrid } from '@/pages/ProductList/components'

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
    },
    keepPreviousData: true,
    retry: 0
  })

  const productList = productsQuery.data?.data.metadata.items || []
  const { page, limit, totalRows } = productsQuery.data?.data.metadata.pagination || {
    page: 1,
    limit: 10,
    totalRows: 0
  }
  const totalPages = totalRows ? Math.ceil(totalRows / limit) : 0

  const handlePageChange = (page: number) => {
    navigate({
      pathname: path.product,
      search: createSearchParams({
        _page: String(page),
        _limit: String(Number(queryConfig.limit))
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

        <ProductListGrid loading={productsQuery.isLoading} productList={productList} />

        <Pagination page={page} count={totalPages} onChange={handlePageChange} />
      </div>
    </div>
  )
}
