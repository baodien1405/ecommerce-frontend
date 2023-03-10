import { SuccessResponse, User } from '@/types'
import axiosClient from './axiosClient'

export const URL_USER = '/user'

const userApi = {
  getProfile() {
    return axiosClient.get<SuccessResponse<User>>(`${URL_USER}/profile`)
  },
  updateProfile(id: string, body: Omit<User, '_id' | 'isAdmin' | 'createdAt' | 'updatedAt' | 'email'>) {
    return axiosClient.put<SuccessResponse<User>>(`${URL_USER}/${id}`, body)
  },
  getUserList(signal?: AbortSignal) {
    return axiosClient.get<SuccessResponse<User[]> & { deletedCount: number }>(URL_USER, {
      signal
    })
  },
  getTrashUserList(signal?: AbortSignal) {
    return axiosClient.get<SuccessResponse<User[]>>(`${URL_USER}/trash`, {
      signal
    })
  },
  getUser(id: number | string) {
    return axiosClient.get<SuccessResponse<User>>(`${URL_USER}/${id}`)
  },
  updateUser(id: number | string, user: Pick<User, 'name' | 'email' | 'phone'>) {
    return axiosClient.put<SuccessResponse<User>>(`${URL_USER}/${id}`, user)
  },
  restoreUser(id: number | string) {
    return axiosClient.patch<Omit<SuccessResponse<any>, 'data'>>(`${URL_USER}/${id}/restore`)
  },
  deleteUser(id: number | string) {
    return axiosClient.delete<Omit<SuccessResponse<any>, 'data'>>(`${URL_USER}/${id}`)
  },
  forceDeleteUser(id: number | string) {
    return axiosClient.delete<Omit<SuccessResponse<any>, 'data'>>(`${URL_USER}/${id}/force`)
  }
}

export default userApi
