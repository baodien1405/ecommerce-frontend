import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'

import authApi from '@/api/auth.api'
import { MutationKeys } from '@/constants'
import { AppContext } from '@/contexts'

export const useLogout = () => {
  const { reset } = useContext(AppContext)

  return useMutation({
    mutationKey: [MutationKeys.LOGOUT],
    mutationFn: authApi.logout,
    onSuccess: () => {
      reset()
    }
  })
}
