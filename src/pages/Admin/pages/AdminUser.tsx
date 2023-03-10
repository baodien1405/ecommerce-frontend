import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Modal, Spin, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import { toast } from 'react-toastify'

import userApi from '@/api/user.api'
import { ErrorResponse, User } from '@/types'
import { isAxiosUnprocessableEntityError } from '@/utils'
import { UserForm } from '../components'
import { useNavigate } from 'react-router-dom'
import { path } from '@/constants'

type FormDataUser = Pick<User, 'name' | 'email' | 'phone'>
interface DataType {
  key?: React.Key
  name?: string
  email?: string
  role?: string
  phone?: string
}

export function AdminUser() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user, setUser] = useState<User | undefined>()
  const [loadingUser, setLoadingUser] = useState(false)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 10000)
      return userApi.getUserList(controller.signal)
    },
    keepPreviousData: true,
    retry: 0
  })

  const updateUserMutation = useMutation({
    mutationFn: (body: FormDataUser) => userApi.updateUser(String(user?._id), body)
  })

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => userApi.deleteUser(id)
  })

  const handleEditUser = async (record: DataType) => {
    setIsModalOpen(true)
    try {
      setLoadingUser(true)
      const response = await userApi.getUser(record.key as string)
      setLoadingUser(false)

      if (response.data.status === 'OK') {
        setUser(response.data.data)
      }
    } catch (error) {
      setLoadingUser(false)
    }
  }

  const handleDeleteUser = async (record: DataType) => {
    Modal.confirm({
      title: 'Remove user',
      content: 'Are you sure?',
      okButtonProps: { danger: true },
      okText: 'Remove',
      onOk: () => {
        deleteUserMutation.mutate(String(record.key), {
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
            <EditOutlined className='cursor-pointer text-[20px] text-[orange]' onClick={() => handleEditUser(record)} />
            <DeleteOutlined
              className='cursor-pointer text-[20px] text-[red]'
              onClick={() => handleDeleteUser(record)}
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

  const handleUpdateUserSubmit = (values: FormDataUser) => {
    updateUserMutation.mutate(values, {
      onSuccess: async (data) => {
        toast.success(data.data?.message)
        setIsModalOpen(false)
        queryClient.invalidateQueries({ queryKey: ['users'], exact: true })
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
      <h3 className='mb-2 text-[20px] font-medium leading-normal'>User management</h3>

      <div className='mb-3 cursor-pointer text-[#1776ff]' onClick={() => navigate(path.adminUserTrash)}>
        {`Trash(${usersQuery.data?.data.deletedCount || 0})`}
      </div>

      <Table
        columns={columns}
        dataSource={data}
        loading={usersQuery.isLoading || usersQuery.isFetching || deleteUserMutation.isLoading}
        rowSelection={{
          type: 'checkbox'
        }}
      />

      <Modal
        title={<div className='text-center text-[25px]'>Update user</div>}
        width={600}
        centered
        keyboard
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <Spin spinning={loadingUser}>
          <UserForm
            loading={updateUserMutation.isLoading}
            isSuccess={updateUserMutation.isSuccess}
            initialValues={user}
            onSubmit={handleUpdateUserSubmit}
          />
        </Spin>
      </Modal>
    </div>
  )
}
