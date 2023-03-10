import { ArrowLeftOutlined, DeleteFilled, RollbackOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Empty, Modal, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

import userApi from '@/api/user.api'
import { path } from '@/constants'
import { ErrorResponse } from '@/types'
import { isAxiosUnprocessableEntityError } from '@/utils'

interface DataType {
  key?: React.Key
  name?: string
  email?: string
  role?: string
  phone?: string
}

export function AdminUserTrash() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 10000)
      return userApi.getTrashUserList(controller.signal)
    },
    keepPreviousData: true,
    retry: 0
  })

  const restoreUserMutation = useMutation({
    mutationFn: (id: string) => userApi.restoreUser(id)
  })

  const forceDeleteUserMutation = useMutation({
    mutationFn: (id: string) => userApi.forceDeleteUser(id)
  })

  const handleRestoreUser = async (record: DataType) => {
    restoreUserMutation.mutate(String(record.key), {
      onSuccess: async (data) => {
        toast.success(data.data?.message)
        queryClient.invalidateQueries({ queryKey: ['users'], exact: true })
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse>(error)) {
          toast.error(error.response?.data?.message)
        }
      }
    })
  }

  const handleForceDeleteUser = async (record: DataType) => {
    Modal.confirm({
      title: 'Delete user',
      content: 'This action cannot restore. Do you still want to delete this user?',
      okButtonProps: { danger: true },
      okText: 'Force delete',
      onOk: () => {
        forceDeleteUserMutation.mutate(String(record.key), {
          onSuccess: (data) => {
            toast.success(data.data?.message)
            queryClient.invalidateQueries({ queryKey: ['users'], exact: true })
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

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'key',
      width: 200
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => Number(a.name?.length) - Number(b.name?.length)
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => Number(a.email?.length) - Number(b.email?.length)
    },
    {
      title: 'Role',
      dataIndex: 'role'
    },
    {
      title: 'Phone',
      dataIndex: 'phone'
    },
    {
      title: 'Action',
      render: (record) => {
        return (
          <div className='flex items-center gap-2'>
            <RollbackOutlined
              className='cursor-pointer text-[20px] text-[orange]'
              onClick={() => handleRestoreUser(record)}
            />
            <DeleteFilled
              className='cursor-pointer text-[20px] text-[red]'
              onClick={() => handleForceDeleteUser(record)}
            />
          </div>
        )
      }
    }
  ]

  const data: DataType[] | undefined = usersQuery.data?.data?.data.map((user) => {
    return {
      key: user._id,
      name: user.name,
      email: user.email,
      role: user.isAdmin ? 'Admin' : 'User',
      phone: user.phone
    }
  })

  return (
    <div className='p-4'>
      <div className='mb-3 flex items-center gap-4'>
        <ArrowLeftOutlined className='cursor-pointer text-[#1776ff]' onClick={() => navigate(path.adminUser)} />
        <h3 className='text-[20px] font-medium leading-normal'>Removed users</h3>
      </div>

      <Table
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <>
                  <span>Trash empty. </span>
                  <Link className='text-[#1776ff]' to={path.adminUser}>
                    User list
                  </Link>
                </>
              }
            />
          )
        }}
        columns={columns}
        dataSource={data}
        loading={
          usersQuery.isLoading ||
          usersQuery.isFetching ||
          restoreUserMutation.isLoading ||
          forceDeleteUserMutation.isLoading
        }
        rowSelection={{
          type: 'checkbox'
        }}
      />
    </div>
  )
}
