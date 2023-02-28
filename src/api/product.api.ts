import { ProductResponse } from '@/types'
import axiosClient from './axiosClient'

const productApi = {
  getProductList(page: number | string, limit: number | string, signal?: AbortSignal) {
    return axiosClient.get<ProductResponse>('/product', {
      params: {
        _page: page,
        _limit: limit
      },
      signal
    })
  }
  // getStudent(id: number | string) {
  //   return axiosClient.get<Student>(`/students/${id}`)
  // },
  // addStudent(student: Omit<Student, 'id'>) {
  //   return axiosClient.post<Student>('/students', student)
  // },
  // updateStudent(id: number | string, student: Student) {
  //   return axiosClient.put<Student>(`/students/${id}`, student)
  // },
  // deleteStudent(id: number | string) {
  //   return axiosClient.delete<{}>(`/students/${id}`)
  // }
}

export default productApi
