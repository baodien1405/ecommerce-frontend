import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Modal, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { ProductForm } from '../components'
import { ErrorResponse, FormDataProduct } from '@/types'
import productApi from '@/api/product.api'
import { isAxiosUnprocessableEntityError } from '@/utils'

interface DataType {
  key?: React.Key
  name?: string
  price?: number
  rating?: number
  type?: string
}

export function AdminProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const productsQuery = useQuery({
    queryKey: ['products', currentPage],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 10000)
      return productApi.getProductList(currentPage, 5, controller.signal)
    },
    keepPreviousData: true,
    retry: 0
  })

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string) => <a>{text}</a>
    },
    {
      title: 'Price',
      dataIndex: 'price'
    },
    {
      title: 'Rating',
      dataIndex: 'rating'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Action',
      render: () => (
        <div className='flex items-center gap-2'>
          <EditOutlined className='cursor-pointer text-[20px] text-[orange]' />
          <DeleteOutlined className='cursor-pointer text-[20px] text-[red]' />
        </div>
      )
    }
  ]

  const data: DataType[] | undefined = productsQuery.data?.data?.data.map((product) => {
    return {
      key: product._id,
      name: product.name,
      price: product.price,
      rating: product.rating,
      type: product.type
    }
  })

  const addProductMutation = useMutation({
    mutationFn: (body: FormDataProduct) => productApi.addProduct(body)
  })

  const handleSubmit = (values: FormDataProduct) => {
    const product: FormDataProduct = {
      name: values.name,
      type: values.type,
      countInStock: Number(values.countInStock),
      price: Number(values.price),
      description: values.description,
      image: values.image,
      rating: Number(values.rating)
    }

    addProductMutation.mutate(product, {
      onSuccess: async (data) => {
        toast.success(data.data?.message)
        setIsModalOpen(false)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse>(error)) {
          toast.error(error.response?.data?.message)
        }
      }
    })
  }

  return (
    <div className='none p-4'>
      <h3 className='mb-2 text-[16px] leading-normal'>Quản lý sản phẩm</h3>

      <Button className='mb-3 h-[150px] w-[150px] rounded-md border-dashed' onClick={() => setIsModalOpen(true)}>
        <PlusOutlined className='text-[60px]' />
      </Button>

      <Modal
        title={<div className='text-center text-[25px]'>Create product</div>}
        width={700}
        centered
        keyboard
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <ProductForm
          loading={addProductMutation.isLoading}
          isSuccess={addProductMutation.isSuccess}
          onSubmit={handleSubmit}
        />
      </Modal>

      <Table
        rowSelection={{
          type: 'checkbox'
        }}
        loading={productsQuery.isLoading}
        columns={columns}
        dataSource={data}
        pagination={{
          current: currentPage,
          total: productsQuery.data?.data.pagination._totalRows,
          onChange: (page) => setCurrentPage(page)
        }}
      />
    </div>
  )
}
