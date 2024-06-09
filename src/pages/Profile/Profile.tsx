import omit from 'lodash/omit'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import PageHeader from '@/components/PageHeader'
import { AppContext } from '@/contexts'
import { ErrorResponse, FormDataProfile } from '@/types'
import { isAxiosUnprocessableEntityError, setProfileToLS } from '@/utils'
import { ProfileCard, ProfileForm, ProfileInfo, ProfilePanel } from './components'
import { useUpdateProfile } from '@/hooks'

export default function Profile() {
  const [t] = useTranslation('profile')
  const { profile, setProfile } = useContext(AppContext)
  const updateProfileMutation = useUpdateProfile(profile?._id as string)

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
        <title>Profile | Shop Food</title>
        <meta name='description' content='Profile of Shop Food' />
      </Helmet>

      <div className='px-[15px] 3xl:px-[26px]'>
        <PageHeader title={t('PROFILE')} />

        <div className='widgets-grid md:!grid-cols-2 xl:!grid-cols-[340px,_minmax(0,1fr)]'>
          <div className='widgets-grid md:col-span-2 md:!grid-cols-2 xl:col-span-1 xl:!grid-cols-1'>
            <ProfileCard profile={profile} />

            <div className='widgets-grid'>
              <ProfilePanel />
              <ProfileInfo />
            </div>
          </div>

          <ProfileForm
            loading={updateProfileMutation.isPending}
            initialValues={initialProfileFormValues}
            onSubmit={handleProfileFormSubmit}
          />
        </div>

        <div className='h-[80px]' />
      </div>
    </div>
  )
}
