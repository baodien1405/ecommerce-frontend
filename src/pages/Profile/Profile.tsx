import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { Helmet } from 'react-helmet-async'

import { ErrorResponse, FormDataProfile } from '@/types'
import { AppContext } from '@/contexts'
import userApi from '@/api/user.api'
import { AsideProfile, ProfileCard, ProfileForm, ProfileInfo, ProfilePanel } from './components'
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

      <div className='px-[15px] 3xl:px-[26px]'>
        <PageHeader title='Settings' />

        <div className='widgets-grid md:!grid-cols-2 xl:!grid-cols-[340px,_minmax(0,1fr)]'>
          <div className='widgets-grid md:col-span-2 md:!grid-cols-2 xl:col-span-1 xl:!grid-cols-1'>
            <ProfileCard profile={profile} />

            <div className='widgets-grid'>
              <ProfilePanel />
              <ProfileInfo />
            </div>
          </div>

          <ProfileForm />
        </div>

        <div className='h-[80px]' />
      </div>
    </div>
  )
}
