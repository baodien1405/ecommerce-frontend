import cn from 'classnames'
import { PRODUCT_CATEGORIES } from '@/constants'

const CategoryHeader = ({ category }: { category: string }) => {
  const productCategory = PRODUCT_CATEGORIES.find((c) => c.value === category)

  if (!productCategory) return null

  return (
    <div className='flex items-center gap-4'>
      <div
        className={cn('badge-icon badge-icon--sm', {
          'bg-accent': productCategory.color === 'accent',
          'bg-header': productCategory.color === 'header',
          'bg-red': productCategory.color === 'red'
        })}
      >
        {productCategory.icon}
      </div>
      <h5>{productCategory.label}</h5>
    </div>
  )
}

export default CategoryHeader
