import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'antd'
import { useForm } from 'react-hook-form'

import { InputField } from '@/components/FormFields'
import { FormDataProfile } from '@/types'
import { useProfileFormSchema } from '@/hooks'
import { UploadAvatar } from './UploadAvatar'

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
    <form onSubmit={handleSubmit(handleUpdateProfile)}>
      <div className='flex gap-5'>
        <UploadAvatar avatar={avatar} onChange={handleAvatarUpload} />

        <div className='w-[700px]'>
          <InputField label='Name' control={control} name='name' placeholder='Thêm tên' />
          <InputField name='email' label='Email' disabled control={control} placeholder='abc@email.com' />
          <InputField label='Phone' control={control} name='phone' placeholder='Thêm số điện thoại' />
          <InputField label='Address' control={control} name='address' placeholder='Thêm địa chỉ' />
        </div>
      </div>

      <Button
        loading={loading}
        disabled={!isValid || loading}
        type='primary'
        htmlType='submit'
        className='mx-auto block h-10 w-[176px] rounded bg-[#0b74e5]'
      >
        {t('save change')}
      </Button>
    </form>
  )
}
