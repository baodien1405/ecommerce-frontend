import ProductType from '@/components/ProductType'
import SlickSlider from '@/components/SlickSlider'
import images from '@/assets/images'

export default function ProductList() {
  const productTypeList = [
    'Meat',
    'Vegetable',
    'Cake',
    'Candy',
    'Fruit',
    'Drink',
    'Wine',
    'Meat',
    'Vegetable',
    'Cake',
    'Candy',
    'Fruit',
    'Drink',
    'Wine'
  ]

  const imageList = [images.slider1, images.slider2, images.slider3, images.slider4, images.slider5]

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
      </div>
    </div>
  )
}
