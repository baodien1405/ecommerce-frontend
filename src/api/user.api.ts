import { ListResponse, SuccessResponse, User } from '@/types'
import axiosClient from './axiosClient'

export const URL_USER = '/user'

const userApi = {
  updateProfile(id: string, body: Partial<User>) {
    return axiosClient.put<SuccessResponse<User>>(`${URL_USER}/${id}`, body)
  },
  getUserList(signal?: AbortSignal) {
    return axiosClient.get<SuccessResponse<ListResponse<User>>>(URL_USER, {
      signal
    })
  },
  getTrashUserList(signal?: AbortSignal) {
    return axiosClient.get<SuccessResponse<ListResponse<User>>>(`${URL_USER}/trash`, {
      signal
    })
  },
  getUser(id: number | string) {
    return axiosClient.get<SuccessResponse<User>>(`${URL_USER}/${id}`)
  },
  updateUser(id: number | string, user: Partial<User>) {
    return axiosClient.put<SuccessResponse<User>>(`${URL_USER}/${id}`, user)
  },
  restoreUser(id: number | string) {
    return axiosClient.patch<Omit<SuccessResponse<unknown>, 'metadata'>>(`${URL_USER}/${id}/restore`)
  },
  deleteUser(id: number | string) {
    return axiosClient.delete<Omit<SuccessResponse<unknown>, 'metadata'>>(`${URL_USER}/${id}`)
  },
  forceDeleteUser(id: number | string) {
    return axiosClient.delete<Omit<SuccessResponse<unknown>, 'metadata'>>(`${URL_USER}/${id}/force`)
  }
}

export default userApi
