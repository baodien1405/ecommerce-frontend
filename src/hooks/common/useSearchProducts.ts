import omit from 'lodash/omit'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { path } from '@/constants'
import { useQueryConfig } from './useQueryConfig'

type FormData = {
  name: string
}

export function useSearchProducts() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()

  const onSubmitSearch = (data: FormData) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.productGrid,
      search: createSearchParams(config).toString()
    })
  }
  return { onSubmitSearch }
}
