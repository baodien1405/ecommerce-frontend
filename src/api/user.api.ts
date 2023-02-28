import { SuccessResponse, User } from '@/types'
import axiosClient from './axiosClient'

const userApi = {
  getProfile() {
    return axiosClient.get<SuccessResponse<User>>('/user/profile')
  },
  updateProfile(id: string, body: Omit<User, '_id' | 'isAdmin' | 'createdAt' | 'updatedAt' | 'email'>) {
    return axiosClient.put<SuccessResponse<User>>(`user/${id}`, body)
  }
}

export default userApi
