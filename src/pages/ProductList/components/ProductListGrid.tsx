import { Empty, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

import ProductCard from '@/components/ProductCard'
import ProductCardSkeleton from '@/components/ProductCardSkeleton'
import { Product } from '@/types'
import { useDeleteProduct, useQueryConfig } from '@/hooks'

interface ProductListGridProps {
  loading: boolean
  productList: Product[]
}

export function ProductListGrid({ loading, productList }: ProductListGridProps) {
  const navigate = useNavigate()
  const deleteProductMutation = useDeleteProduct()
  const queryClient = useQueryClient()
  const queryConfig = useQueryConfig()

  if (loading) {
    return Array.from({ length: 12 }).map((_x, idx) => <ProductCardSkeleton key={idx} />)
  }

  if (!productList.length) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Empty product' />
      </div>
    )
  }

  const handleEditProduct = (productId: string) => {
    navigate(`/add-edit-product/${productId}`)
  }

  const handleDeleteProduct = (productId: string) => {
    Modal.confirm({
      title: 'Warning',
      content: 'Are you sure?',
      okButtonProps: { className: 'bg-[#1776ff]', loading: deleteProductMutation.isPending },
      onOk: () => {
        deleteProductMutation.mutate(productId, {
          onSuccess: (data) => {
            toast.success(data.data?.message)
            queryClient.invalidateQueries({ queryKey: ['products', queryConfig], exact: true })
          },
          onError: (error) => {
            toast.error(error?.message)
          }
        })
      }
    })
  }

  return (
    <>
      <div className='mb-[30px] mt-5 grid flex-1 items-start gap-[26px] sm:grid-cols-2 md:mt-7 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6'>
        {productList.map((product, index) => (
          <ProductCard
            key={product._id}
            product={product}
            index={index}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
    </>
  )
}
