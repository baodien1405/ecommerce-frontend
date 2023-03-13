import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { useQueryParams } from './useQueryParams'
import { ProductListConfig } from '@/types'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      _page: queryParams._page || '1',
      _limit: queryParams._limit || '10',
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category
    },
    isUndefined
  )
  return queryConfig
}
