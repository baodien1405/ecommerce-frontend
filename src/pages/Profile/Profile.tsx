import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

import { ErrorResponse, FormDataProfile } from '@/types'
import { AppContext } from '@/contexts'
import { AsideProfile, ProfileForm } from './components'
import userApi from '@/api/user.api'
import { isAxiosUnprocessableEntityError, setProfileToLS } from '@/utils'

export default function Profile() {
  const [t] = useTranslation('profile')
  const { profile, setProfile } = useContext(AppContext)

  const updateProfileMutation = useMutation({
    mutationFn: (body: Omit<FormDataProfile, 'email'>) => userApi.updateProfile(String(profile?._id), body)
  })

  const initialProfileFormValues = {
    name: profile?.name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    avatar: profile?.avatar || ''
  }

  const handleProfileFormSubmit = (formValues: FormDataProfile) => {
    const { email, ...restFormValues } = formValues

    updateProfileMutation.mutate(restFormValues, {
      onSuccess: async (data) => {
        toast.success(data.data?.message)
        setProfile(data.data.data)
        setProfileToLS(data.data.data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse>(error)) {
          toast.error(error.response?.data?.message)
        }
      }
    })
  }

  return (
    <div className='h-[calc(100vh-61px)] bg-[#efefef]'>
      <div className='container'>
        <h4 className='py-[10px] text-sm font-light text-[#808089]'>{t('homepage > account info')}</h4>

        <div className='flex gap-[17px]'>
          <AsideProfile />
          <div className='flex-1'>
            <div className='mt-1 mb-3 text-[20px] font-light leading-8'>{t('account info')}</div>
            <div className='rounded-lg bg-white p-4'>
              <span className='mb-4 inline-block text-base font-normal text-[#64646d]'>{t('personal info')}</span>
              <ProfileForm
                loading={updateProfileMutation.isLoading}
                initialValues={initialProfileFormValues}
                onSubmit={handleProfileFormSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
