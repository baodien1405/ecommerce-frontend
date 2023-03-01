import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Button, Col, Row } from 'antd'

import Image from '@/components/Image'
import productApi from '@/api/product.api'
import images from '@/assets/images'
import ProductCard from '@/components/ProductCard'
import ProductCardSkeleton from '@/components/ProductCardSkeleton'
import ProductType from '@/components/ProductType'
import SlickSlider from '@/components/SlickSlider'
import { AsideFilter } from './components'
import { useQueryString } from '@/hooks'

const productTypeList = ['Meat', 'Vegetable', 'Cake', 'Candy', 'Fruit', 'Drink', 'Wine']
const imageList = [images.slider1, images.slider2, images.slider3, images.slider4, images.slider5]

export default function ProductList() {
  const [t] = useTranslation('productList')
  const queryString: { _page?: string; _limit?: string } = useQueryString()
  const page = Number(queryString._page) || 1
  const limit = Number(queryString._limit) || 8

  const productsQuery = useQuery({
    queryKey: ['products', page, limit],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 10000)
      return productApi.getProductList(page, limit, controller.signal)
    },
    keepPreviousData: true,
    retry: 0
  })

  const outstandingList = [
    { id: '1', imageURL: images.sale33, label: '3.3 Sale Freeship' },
    { id: '2', imageURL: images.goodPrice, label: 'Giá Tốt Mỗi Ngày' },
    { id: '3', imageURL: images.discountVoucher, label: 'Mã giảm giá' },
    { id: '4', imageURL: images.endowAffiliate, label: 'Ưu đãi Affiliate' }
  ]

  return (
    <div className='bg-[#efefef]'>
      <div className='bg-white'>
        <div className='container'>
          <div className='flex gap-8 overflow-hidden text-ellipsis whitespace-nowrap py-[10px]'>
            {productTypeList.map((item) => (
              <ProductType key={item} productType={item} />
            ))}
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='mt-4 flex'>
          <div className='mr-2 w-[200px] rounded bg-white py-3 px-[8px]'>
            <div className='text-[#27272aư pl-4 text-[14px] font-bold leading-normal'>Nổi bật</div>

            {outstandingList.map((item) => (
              <div key={item.id} className='flex items-center px-4 py-[7px]'>
                <div className='mr-2 h-[34px] w-[34px]'>
                  <Image src={item.imageURL} alt='' className='w-full rounded-lg object-cover' />
                </div>
                <div className='text-[14px] font-normal leading-normal text-[#27272a]'>{item.label}</div>
              </div>
            ))}
          </div>

          <div className='flex w-[calc(100%-208px)] gap-4'>
            <div className=' w-[calc(100%-256px)]'>
              <SlickSlider imageList={imageList} />
            </div>

            <div className='h-[240px] w-[240px]'>
              <Image src={images.subBanner} alt='sub banner' className='w-full rounded-lg object-cover' />
            </div>
          </div>
        </div>

        <div className='flex gap-2 py-8'>
          <AsideFilter />

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
                Array(10)
                  .fill(0)
                  .map((item, index) => (
                    <Col key={index}>
                      <ProductCard />
                    </Col>
                  ))}
            </Row>

            <Row>
              <Button
                type='primary'
                ghost
                className='mx-auto mt-3 h-[42px] w-60 border-[1px] border-[#0a68ff] px-3 py-2 text-[16px] leading-normal text-[#0a68ff]'
              >
                {t('view more')}
              </Button>
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}
