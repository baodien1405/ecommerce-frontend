export interface Pagination {
  _limit: number
  _page: number
  _totalRows: number
}

export interface ListResponse<T> {
  items: Array<T>
  pagination?: Pagination
  deletedCount?: number
}
