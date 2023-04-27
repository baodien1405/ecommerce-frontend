export interface Pagination {
  limit: number
  page: number
  totalRows: number
}

export interface ListResponse<T> {
  items: Array<T>
  pagination?: Pagination
  deletedCount?: number
}
