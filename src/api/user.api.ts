import { SuccessResponse, User } from '@/types'
import axiosClient from './axiosClient'

const userApi = {
  getProfile(id: string) {
    return axiosClient.get<SuccessResponse<User>>(`/user/get-detail/${id}`)
  }
}

export default userApi
