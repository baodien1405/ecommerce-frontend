import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { Helmet } from 'react-helmet-async'

import { ErrorResponse, FormDataProfile } from '@/types'
import { AppContext } from '@/contexts'
import userApi from '@/api/user.api'
import { AsideProfile, ProfileForm } from './components'
import { isAxiosUnprocessableEntityError, setProfileToLS } from '@/utils'
import PageHeader from '@/components/PageHeader'

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
    const newFormValues = omit(formValues, ['email'])

    updateProfileMutation.mutate(newFormValues, {
      onSuccess: async (data) => {
        const profile = data.data.metadata
        toast.success(data.data.message)
        setProfile(profile)
        setProfileToLS(profile)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<any>>(error)) {
          toast.error(error.response?.data?.message)
        }
      }
    })
  }

  return (
    <div>
      <Helmet>
        <title>Profile | Tiki Clone</title>
        <meta name='description' content='Profile of Tiki Clone' />
      </Helmet>

      <div>
        <PageHeader title='Settings' />

        <div className='flex gap-[17px]'>
          <AsideProfile />
          <div className='flex-1'>
            <div className='mb-3 mt-1 text-[20px] font-light leading-8'>{t('account info')}</div>
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
