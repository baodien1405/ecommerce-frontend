import { useQuery } from '@tanstack/react-query'
import { Col, Row } from 'antd'
import { createSearchParams, useNavigate } from 'react-router-dom'

import productApi from '@/api/product.api'
import ProductCard from '@/components/ProductCard'
import ProductCardSkeleton from '@/components/ProductCardSkeleton'
import { useQueryConfig } from '@/hooks'
import { ProductListConfig } from '@/types'
import { convertTitleCase } from '@/utils'
import { path } from '@/constants'

export default function ProductType() {
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

  const productTypesQuery = useQuery({
    queryKey: ['types'],
    queryFn: () => productApi.getProductTypeList(),
    retry: 0
  })

  return (
    <div className='bg-[#efefef]'>
      <div className='container'>
        <div className='flex gap-2 py-4'>
          <div className='mr-2 h-full w-[200px] rounded bg-white py-3 px-[8px]'>
            <div className='pl-4 text-[14px] font-bold leading-normal text-[#272727]'>Nổi bật</div>

            {productTypesQuery.isLoading && (
              <div
                role='status'
                className='min-h-[300px] max-w-sm animate-pulse rounded p-2 shadow dark:border-gray-700'
              >
                {Array(8)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className='w-25 mb-4 h-2 rounded-full bg-gray-200 dark:bg-gray-700'></div>
                  ))}
              </div>
            )}

            {productTypesQuery.data?.data.data.map((item) => (
              <div
                key={item}
                className='flex cursor-pointer items-center px-4 py-[7px]'
                onClick={() =>
                  navigate({
                    pathname: path.productType,
                    search: createSearchParams({
                      type: item.toLowerCase()
                    }).toString()
                  })
                }
              >
                <div className='text-[14px] font-normal leading-normal text-[#27272a]'>{convertTitleCase(item)}</div>
              </div>
            ))}
          </div>

          <div className='flex-1'>
            <Row gutter={[8, 8]}>
              {productsQuery.isLoading &&
                Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <Col key={index}>
                      <ProductCardSkeleton />
                    </Col>
                  ))}

              {!productsQuery.isLoading &&
                productsQuery.data?.data.data.map((product) => (
                  <Col key={product._id}>
                    <ProductCard product={product} />
                  </Col>
                ))}
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}
