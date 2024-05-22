import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import productApi from '@/api/product.api'
import ProductCard from '@/components/ProductCard'
import ProductCardSkeleton from '@/components/ProductCardSkeleton'
import { useQueryConfig } from '@/hooks'
import { ProductListConfig } from '@/types'

import PageHeader from '@/components/PageHeader'
import { Pagination } from 'antd'

export default function ProductList() {
  const [t] = useTranslation('productList')
  const queryConfig = useQueryConfig()

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

  return (
    <div className='py-5'>
      <Helmet>
        <title>Homepage | ShopFood</title>
        <meta name='description' content='Homepage' />
      </Helmet>

      <div className='container'>
        <PageHeader title={t('PRODUCTS_TITLE')} />

        <div
          className='mb-[30px] mt-5 grid flex-1 items-start gap-[26px] sm:grid-cols-2 md:mt-7 md:grid-cols-3
                 lg:grid-cols-4 2xl:grid-cols-6'
        >
          {productsQuery.isLoading && <ProductCardSkeleton />}

          {!productsQuery.isLoading &&
            productsQuery.data?.data.metadata.items.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
        </div>

        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  )
}
