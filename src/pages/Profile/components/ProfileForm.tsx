import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { InputField } from '@/components/FormFields'
import { FormDataProfile } from '@/types'
import { useProfileFormSchema } from '@/hooks'
import { UploadAvatar } from './UploadAvatar'
import Spring from '@/components/Spring'
import Button from '@/components/Button'
import { AdminPanelTools } from './AdminPanelTools'

export interface ProfileFormProps {
  initialValues?: FormDataProfile
  loading?: boolean
  onSubmit?: (values: FormDataProfile) => void
}

export function ProfileForm({ initialValues, loading, onSubmit }: ProfileFormProps) {
  const [avatar, setAvatar] = useState(initialValues?.avatar || '')
  const [t] = useTranslation('profile')
  const schema = useProfileFormSchema()
  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm<FormDataProfile>({
    mode: 'onSubmit',
    defaultValues: initialValues,
    resolver: yupResolver(schema)
  })

  const handleAvatarUpload = (avatar: string) => {
    setAvatar(avatar)
  }

  const handleUpdateProfile = async (values: FormDataProfile) => {
    await onSubmit?.({ ...values, avatar })
  }

  return (
    <Spring
      type='fade'
      className='card flex flex-col gap-[30px] md:col-span-2 md:row-start-2 md:gap-12 md:!pb-[50px]
                xl:col-span-1 xl:col-start-2 xl:row-start-1'
    >
      <div className='flex flex-col gap-5'>
        <h5>{t('MY_PROFILE_DETAILS')}</h5>
        <form onSubmit={handleSubmit(handleUpdateProfile)}>
          <div className='grid gap-4 md:grid-cols-2 md:gap-5'>
            <div className='grid gap-4'>
              <InputField label='Name' control={control} name='name' placeholder='Thêm tên' />
              <InputField name='email' label='Email' disabled control={control} placeholder='abc@email.com' />
              <InputField label='Phone' control={control} name='phone' placeholder='Thêm số điện thoại' />
              <InputField label='Address' control={control} name='address' placeholder='Thêm địa chỉ' />
            </div>
          </div>

          <div className='mt-2.5'>
            <Button
              loading={loading}
              disabled={!isValid || loading}
              variant='primary'
              htmlType='submit'
              size='large'
              className='mt-5 w-full md:w-fit md:px-[70px]'
            >
              {t('UPDATE_INFORMATION')}
            </Button>
          </div>
        </form>
      </div>

      <AdminPanelTools />
    </Spring>
  )
}
