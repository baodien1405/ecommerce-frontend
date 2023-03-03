import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Modal, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ProductForm } from '../components'
import { FormDataProduct } from '@/types'

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

  const handleSubmit = (values: FormDataProduct) => {
    console.log('🚀 ~ handleSubmit ~ values:', values)
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
        <ProductForm onSubmit={handleSubmit} />
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
