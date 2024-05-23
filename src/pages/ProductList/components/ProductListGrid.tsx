import ProductCard from '@/components/ProductCard'
import ProductCardSkeleton from '@/components/ProductCardSkeleton'
import { Product } from '@/types'

interface ProductListGridProps {
  loading: boolean
  productList: Product[]
}

export function ProductListGrid({ loading, productList }: ProductListGridProps) {
  if (loading) {
    return Array.from({ length: 12 }).map((_x, idx) => <ProductCardSkeleton key={idx} />)
  }

  return (
    <>
      <div className='mb-[30px] mt-5 grid flex-1 items-start gap-[26px] sm:grid-cols-2 md:mt-7 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6'>
        {productList.map((product, index) => (
          <ProductCard key={product._id} product={product} index={index} />
        ))}
      </div>
    </>
  )
}
