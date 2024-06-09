import { useMutation } from '@tanstack/react-query'

import userApi from '@/api/user.api'
import { MutationKeys } from '@/constants'
import { User } from '@/types'

export const useUpdateProfile = (userId: string) => {
  return useMutation({
    mutationKey: [MutationKeys.UPDATE_PROFILE],
    mutationFn: (body: Partial<User>) => userApi.updateProfile(userId, body)
  })
}
