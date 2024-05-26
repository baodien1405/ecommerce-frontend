import { NavLink } from 'react-router-dom'
import cn from 'classnames'
import { Rate } from 'antd'

import Image from '@/components/Image'
import { Product } from '@/types'
import { formatAmount } from '@/utils'
import Spring from '@/components/Spring'
import Button from '@/components/Button'
import { PencilSolidIcon } from '@/components/Icons'

interface ProductCardProps {
  product: Product
  isSlide?: boolean
  index?: number
}

export default function ProductCard({ product, isSlide, index }: ProductCardProps) {
  const Wrapper: any = isSlide ? 'div' : Spring
  const wrapperProps = isSlide ? {} : { type: 'slideUp', index }

  if (!product) return null

  return (
    <Wrapper className='card flex h-full flex-col' {...wrapperProps}>
      <div className='mb-2.5 flex items-start gap-[14px]'>
        <div className='flex flex-1 items-center justify-center overflow-hidden rounded-md border-[1px] border-solid border-border bg-white'>
          <Image src={product.product_thumb} alt={product.product_name} />
        </div>
        {/* <SubmenuTrigger className='text-accent' onClick={() => {}} /> */}
      </div>

      <NavLink
        className={cn('h6 block max-w-[180px] text-ellipsis !leading-[1.4] transition hover:text-accent', {
          'mb-3': isSlide
        })}
        to='/product-editor'
      >
        {product.product_name}
      </NavLink>

      {isSlide && <Rate allowHalf value={product.product_ratingsAverage} />}

      <div className={`flex flex-1 flex-col ${isSlide ? 'mt-1.5 gap-1' : 'mt-2.5 gap-2.5'}`}>
        <p className='font-heading text-sm font-bold leading-[1.4] text-green'>
          Available : {product.product_quantity || 0}
        </p>
        <p className='font-heading text-sm font-bold leading-[1.4] text-accent'>
          Already sold : {product.product_quantity || 0}
        </p>

        {!isSlide && (
          <>
            <p className='font-heading text-sm font-bold leading-[1.4]'>
              Regular price : {formatAmount(product.product_price || 0)}
            </p>
            <p className='font-heading text-sm font-bold leading-[1.4]'>
              Sale price : {formatAmount(product.product_price || 0)}
            </p>
          </>
        )}
      </div>

      {!isSlide && (
        <div className='mt-4 grid grid-cols-2 gap-1.5'>
          <Button
            variant='outline'
            outlineColor='blue'
            size='large'
            className='mx-auto !h-[38px] w-full gap-1.5 text-sm'
          >
            <PencilSolidIcon width='16px' height='16px' />
            Edit
          </Button>

          <Button variant='outline' outlineColor='red' size='large' className='mx-auto !h-[38px] w-full text-sm'>
            Delete
          </Button>
        </div>
      )}
    </Wrapper>
  )
}
