import { useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Empty, Input, InputRef, Modal, Space, Spin, Table } from 'antd'
import type { ColumnsType, ColumnType } from 'antd/es/table'
import { FilterConfirmProps } from 'antd/es/table/interface'

import { ProductForm } from '../components'
import { ErrorResponse, FormDataProduct, Product } from '@/types'
import productApi from '@/api/product.api'
import { isAxiosUnprocessableEntityError } from '@/utils'

interface DataType {
  key?: React.Key
  name?: string
  price?: number
  rating?: number
  type?: string
}

const PRODUCT_LIMIT = 5
const PRODUCT_PAGE = 1

export function AdminProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(PRODUCT_PAGE)
  const [product, setProduct] = useState<Product | undefined>()
  const [loadingProduct, setLoadingProduct] = useState(false)
  const queryClient = useQueryClient()
  const searchInput = useRef<InputRef>(null)

  const productsQuery = useQuery({
    queryKey: ['products', currentPage],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 10000)
      return productApi.getProductList(currentPage, PRODUCT_LIMIT, controller.signal)
    },
    keepPreviousData: true,
    retry: 0
  })

  const addProductMutation = useMutation({
    mutationFn: (body: FormDataProduct) => productApi.addProduct(body)
  })

  const updateProductMutation = useMutation({
    mutationFn: (body: FormDataProduct) => productApi.updateProduct(String(product?._id), body)
  })

  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => productApi.deleteProduct(id)
  })

  const handleSearch = (confirm: (param?: FilterConfirmProps) => void) => {
    confirm()
  }
  const handleReset = (clearFilters: () => void) => {
    clearFilters()
  }

  const getColumnSearchProps = (dataIndex: keyof DataType): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div className='p-2' onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(confirm)}
          className='mb-2 block'
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined />}
            size='small'
            className='flex w-[90px] items-center bg-[#1890ff]'
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size='small' className='w-[90px]'>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined className={filtered ? 'text-[#1890ff]' : ''} />,
    onFilter: (value, record) =>
      String(record?.[dataIndex]).toString().toLowerCase().includes(String(value).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    }
  })

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'key',
      width: 200
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => Number(a.name?.length) - Number(b.name?.length),
      ...getColumnSearchProps('name')
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => Number(a.price) - Number(b.price)
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a, b) => Number(a.rating) - Number(b.rating)
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Action',
      render: (record) => {
        return (
          <div className='flex items-center gap-2'>
            <EditOutlined
              className='cursor-pointer text-[20px] text-[orange]'
              onClick={() => handleEditProduct(record)}
            />
            <DeleteOutlined
              className='cursor-pointer text-[20px] text-[red]'
              onClick={() => handleDeleteProduct(record)}
            />
          </div>
        )
      }
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

  const handleEditProduct = async (record: DataType) => {
    setIsModalUpdateOpen(true)
    try {
      setLoadingProduct(true)
      const response = await productApi.getProduct(record.key as string)
      setLoadingProduct(false)

      if (response.data.status === 'OK') {
        setProduct(response.data.data)
      }
    } catch (error) {
      setLoadingProduct(false)
    }
  }

  const handleDeleteProduct = async (record: DataType) => {
    Modal.confirm({
      title: 'Warning',
      content: 'Are you sure?',
      okButtonProps: { className: 'bg-[#1776ff]' },
      onOk: () => {
        deleteProductMutation.mutate(String(record.key), {
          onSuccess: (data) => {
            toast.success(data.data?.message)
            queryClient.invalidateQueries({ queryKey: ['products', currentPage], exact: true })
          },
          onError: (error) => {
            if (isAxiosUnprocessableEntityError<ErrorResponse>(error)) {
              toast.error(error.response?.data?.message)
            }
          }
        })
      }
    })
  }

  const handleAddProductSubmit = (values: FormDataProduct) => {
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
        queryClient.invalidateQueries({ queryKey: ['products', currentPage], exact: true })
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse>(error)) {
          toast.error(error.response?.data?.message)
        }
      }
    })
  }

  const handleUpdateProductSubmit = (values: FormDataProduct) => {
    const product: FormDataProduct = {
      name: values.name,
      type: values.type,
      countInStock: Number(values.countInStock),
      price: Number(values.price),
      description: values.description,
      image: values.image,
      rating: Number(values.rating)
    }

    updateProductMutation.mutate(product, {
      onSuccess: async (data) => {
        toast.success(data.data?.message)
        setIsModalUpdateOpen(false)
        queryClient.invalidateQueries({ queryKey: ['products', currentPage], exact: true })
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse>(error)) {
          toast.error(error.response?.data?.message)
        }
      }
    })
  }

  return (
    <div className='p-4'>
      <h3 className='mb-2 text-[16px] leading-normal'>Product management</h3>

      <Button className='mb-3 h-[150px] w-[150px] rounded-md border-dashed' onClick={() => setIsModalOpen(true)}>
        <PlusOutlined className='text-[60px]' />
      </Button>

      <Modal
        title={<div className='text-center text-[25px]'>Add product</div>}
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
          onSubmit={handleAddProductSubmit}
        />
      </Modal>

      <Table
        locale={{
          emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Empty product' />
        }}
        columns={columns}
        dataSource={data}
        loading={productsQuery.isLoading || deleteProductMutation.isLoading || updateProductMutation.isLoading}
        rowSelection={{
          type: 'checkbox'
        }}
        pagination={{
          current: currentPage,
          total: productsQuery.data?.data.pagination._totalRows,
          onChange: (page) => setCurrentPage(page)
        }}
      />

      <Modal
        title={<div className='text-center text-[25px]'>Update product</div>}
        width={700}
        centered
        keyboard
        open={isModalUpdateOpen}
        footer={null}
        onCancel={() => setIsModalUpdateOpen(false)}
      >
        <Spin spinning={loadingProduct}>
          <ProductForm
            type='update'
            loading={updateProductMutation.isLoading}
            isSuccess={updateProductMutation.isSuccess}
            initialValues={product}
            onSubmit={handleUpdateProductSubmit}
          />
        </Spin>
      </Modal>
    </div>
  )
}
