import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Modal, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ProductForm } from '../components'
import { ErrorResponse, FormDataProduct } from '@/types'
import { useMutation } from '@tanstack/react-query'
import productApi from '@/api/product.api'
import { toast } from 'react-toastify'
import { isAxiosUnprocessableEntityError } from '@/utils'

interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text: string) => <a>{text}</a>
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
]

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park'
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sydney No. 1 Lake Park'
  }
]

export function AdminProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
        okButtonProps={{ className: 'hidden' }}
        cancelButtonProps={{ className: 'hidden' }}
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
        columns={columns}
        dataSource={data}
      />
    </div>
  )
}
