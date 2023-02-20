import ProductType from '@/components/ProductType'
import SlickSlider from '@/components/SlickSlider'
import images from '@/assets/images'
import ProductCard from '@/components/ProductCard'
import { Button, Col, Row } from 'antd'
import { AsideFilter } from './components'
import { useQuery } from '@tanstack/react-query'
import { useQueryString } from '@/hooks/useQueryString'
import productApi from '@/api/productApi'

export default function ProductList() {
  const productTypeList = ['Meat', 'Vegetable', 'Cake', 'Candy', 'Fruit', 'Drink', 'Wine']
  const imageList = [images.slider1, images.slider2, images.slider3, images.slider4, images.slider5]

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
  console.log('🚀 ~ ProductList ~ productsQuery:', productsQuery.data)

  return (
    <div className='bg-[#efefef]'>
      <div className='bg-white'>
        <div className='container'>
          <div className='flex gap-8 overflow-hidden text-ellipsis whitespace-nowrap border-b-[1px] border-b-[red] py-[10px]'>
            {productTypeList.map((item) => (
              <ProductType key={item} productType={item} />
            ))}
          </div>
        </div>
      </div>

      <div className='container'>
        <SlickSlider imageList={imageList} />

        <div className='flex gap-2 py-8'>
          <AsideFilter />

          <div className='flex-1'>
            <Row gutter={[8, 8]}>
              {Array(10)
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
                Xem thêm
              </Button>
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}
