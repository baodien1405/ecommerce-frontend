import { PlusOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
}

export function AdminUser() {
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
  return (
    <div className='p-4'>
      <h3 className='mb-2 text-[16px] leading-normal'>Quản lý người dùng</h3>
      <Button className='h-[150px] w-[150px] rounded-md border-dashed'>
        <PlusOutlined className='text-[60px]' />
      </Button>

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
