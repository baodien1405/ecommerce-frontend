import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Empty, Modal, Spin, Table } from 'antd'
import { Excel } from 'antd-table-saveas-excel'
import { IExcelColumn } from 'antd-table-saveas-excel/app'
import type { ColumnsType } from 'antd/es/table'
import React, { useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import productApi from '@/api/product.api'
import { path } from '@/constants'
import { useQueryConfig } from '@/hooks'
import { ErrorResponse, FormDataAction, FormDataProduct, Product, ProductListConfig } from '@/types'
import { formatAmount, isAxiosUnprocessableEntityError } from '@/utils'
import { ActionForm, ProductForm } from '../components'
import { Card, Search } from '@/components/Common'
import LinkButton from '@/components/LinkButton'
import Button from '@/components/Button'
import { EditIcon, TrashIcon } from '@/components/Icons'

interface DataType {
  key?: React.Key
  name?: string
  type?: string
  price?: number
  rating?: number
  quantity?: number
}

const PRODUCT_LIMIT = 5
const PRODUCT_PAGE = 1

export function AdminProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
  const [product, setProduct] = useState<Product | undefined>()
  const [productIdList, setProductIdList] = useState<string[]>([])
  const [loadingProduct, setLoadingProduct] = useState(false)
  const queryClient = useQueryClient()
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()

  const initialValueEditForm: FormDataProduct = {
    name: product?.product_name || '',
    description: product?.product_description || '',
    image: product?.product_thumb || '',
    price: product?.product_price || 0,
    quantity: product?.product_quantity || 0,
    type: product?.product_type || ''
  }

  const productsQuery = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 10000)
      return productApi.getProductList(queryConfig as ProductListConfig, controller.signal)
    },
    keepPreviousData: true,
    retry: 0
  })

  const productList = productsQuery.data?.data.metadata.items || []

  const addProductMutation = useMutation({
    mutationFn: (body: Partial<Product>) => productApi.addProduct(body)
  })

  const updateProductMutation = useMutation({
    mutationFn: (body: Partial<Product>) => productApi.updateProduct(String(product?._id), body)
  })

  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => productApi.deleteProduct(id)
  })

  const deleteManyProductsMutation = useMutation({
    mutationFn: (ids: string[]) => productApi.deleteManyProducts(ids)
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
      render: (value) => formatAmount(value)
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => Number(a.price) - Number(b.price)
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      sorter: (a, b) => Number(a.quantity) - Number(b.quantity)
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a, b) => Number(a.rating) - Number(b.rating)
    },
    {
      title: 'Product Type',
      dataIndex: 'type'
    },
    {
      title: 'Action',
      render: (record) => {
        return (
          <div className='flex items-center gap-2'>
            <button onClick={() => handleEditProduct(record)}>
              <EditIcon className='cursor-pointer text-[orange]' width='16px' height='16px' />
            </button>
            <button onClick={() => handleDeleteProduct(record)}>
              <TrashIcon className='cursor-pointer text-[red]' width='16px' height='16px' />
            </button>
          </div>
        )
      }
    }
  ]

  const data: DataType[] = productList.map((product) => {
    return {
      key: product._id,
      name: product.product_name,
      price: product.product_price,
      rating: product.product_ratingsAverage,
      type: product.product_type,
      quantity: product.product_quantity
    }
  })

  const handleEditProduct = async (record: DataType) => {
    setIsModalUpdateOpen(true)
    try {
      setLoadingProduct(true)
      const response = await productApi.getProduct(record.key as string)
      setLoadingProduct(false)

      if (response.data.status === 'OK') {
        setProduct(response.data.metadata)
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
            queryClient.invalidateQueries({ queryKey: ['products', queryConfig], exact: true })
          },
          onError: (error) => {
            if (isAxiosUnprocessableEntityError<ErrorResponse<any>>(error)) {
              toast.error(error.response?.data?.message)
            }
          }
        })
      }
    })
  }

  const handleAddProductSubmit = (values: FormDataProduct) => {
    const product = {
      product_name: values.name,
      product_type: values.type,
      product_quantity: Number(values.quantity),
      product_price: Number(values.price),
      product_description: values.description,
      product_thumb: values.image
    }

    if (['Clothing', 'Furniture'].includes(values.type)) {
      Object.assign(product, {
        product_attributes: {
          brand: values.brand,
          size: values.size,
          material: values.material
        }
      })
    }

    if (values.type === 'Electronics') {
      Object.assign(product, {
        product_attributes: {
          manufacturer: values.manufacturer,
          model: values.model,
          color: values.color
        }
      })
    }

    addProductMutation.mutate(product, {
      onSuccess: async (data) => {
        toast.success(data.data?.message)
        setIsModalOpen(false)
        queryClient.invalidateQueries({ queryKey: ['products', queryConfig], exact: true })
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<any>>(error)) {
          toast.error(error.response?.data?.message)
        }
      }
    })
  }

  const handleUpdateProductSubmit = (values: FormDataProduct) => {
    const product = {
      product_name: values.name,
      product_type: values.type,
      product_quantity: Number(values.quantity),
      product_price: Number(values.price),
      product_description: values.description,
      product_thumb: values.image
    }

    if (['Clothing', 'Furniture'].includes(values.type)) {
      Object.assign(product, {
        product_attributes: {
          brand: values.brand,
          size: values.size,
          material: values.material
        }
      })
    }

    if (values.type === 'Electronics') {
      Object.assign(product, {
        product_attributes: {
          manufacturer: values.manufacturer,
          model: values.model,
          color: values.color
        }
      })
    }

    updateProductMutation.mutate(product, {
      onSuccess: async (data) => {
        toast.success(data.data?.message)
        setIsModalUpdateOpen(false)
        queryClient.invalidateQueries({ queryKey: ['products', queryConfig], exact: true })
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<any>>(error)) {
          toast.error(error.response?.data?.message)
        }
      }
    })
  }

  const handleActionFormSubmit = async (values: FormDataAction) => {
    if (values.action === 'delete') {
      deleteManyProductsMutation.mutate(productIdList, {
        onSuccess: (data) => {
          toast.success(data.data?.message)
          queryClient.invalidateQueries({ queryKey: ['products', queryConfig], exact: true })
        },
        onError: (error) => {
          if (isAxiosUnprocessableEntityError<ErrorResponse<any>>(error)) {
            toast.error(error.response?.data?.message)
          }
        }
      })
    }
  }

  const newColumnExport = columns.filter((col) => col.title !== 'Action')

  const handleExportExcelFile = () => {
    const excel = new Excel()
    excel
      .addSheet('Product')
      .addColumns(newColumnExport as IExcelColumn[])
      .addDataSource(data as DataType[], {
        str2Percent: true
      })
      .saveAs('products.xlsx')
  }

  const handleSearch = () => {}

  return (
    <div className='h-full bg-[#f3f4f6] p-4'>
      <Card className='mb-8 flex flex-col items-center md:flex-row'>
        <div className='mb-4 md:mb-0 md:w-1/4'>
          <h1 className='text-lg font-semibold text-heading'>Products</h1>
        </div>

        <div className='ms-auto flex w-full items-center md:w-3/4'>
          <Search onSearch={handleSearch} />
          <LinkButton href={''} className='ml-4 h-12 md:ml-6' onClick={() => setIsModalOpen(true)}>
            <span className='hidden md:block'>+ Add Product</span>
            <span className='md:hidden'>+ Add</span>
          </LinkButton>
        </div>
      </Card>

      <div className='flex justify-between'>
        <div className='mb-3 w-[500px]'>
          <ActionForm
            loading={deleteManyProductsMutation.isLoading}
            disabled={productIdList.length === 0}
            onSubmit={handleActionFormSubmit}
          />
        </div>

        <Button
          loading={false}
          disabled={productList.length === 0}
          size='small'
          htmlType='button'
          onClick={handleExportExcelFile}
        >
          Export
        </Button>
      </div>

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
        loading={
          productsQuery.isFetching ||
          deleteProductMutation.isLoading ||
          updateProductMutation.isLoading ||
          deleteManyProductsMutation.isLoading
        }
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys) => {
            setProductIdList(selectedRowKeys as string[])
          }
        }}
        pagination={{
          current: Number(queryConfig.page) || PRODUCT_PAGE,
          pageSize: PRODUCT_LIMIT,
          total: productsQuery.data?.data.metadata.pagination.totalRows,
          onChange: (page) =>
            navigate({
              pathname: path.adminProduct,
              search: createSearchParams({
                page: String(page),
                limit: String(PRODUCT_LIMIT)
              }).toString()
            })
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
            initialValues={initialValueEditForm}
            onSubmit={handleUpdateProductSubmit}
          />
        </Spin>
      </Modal>
    </div>
  )
}
