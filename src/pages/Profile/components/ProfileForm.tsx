import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form, Upload } from 'antd'
import { useForm } from 'react-hook-form'
import { InputField } from '@/components/FormFields'
import { FormDataProfile } from '@/types'
import { useProfileFormSchema } from '@/hooks'
import Image from '@/components/Image'

export interface ProfileFormProps {
  initialValues?: FormDataProfile
  onSubmit?: (values: FormDataProfile) => void
}

export function ProfileForm({ initialValues, onSubmit }: ProfileFormProps) {
  const [t] = useTranslation('profile')
  const schema = useProfileFormSchema()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid }
  } = useForm<FormDataProfile>({
    mode: 'onChange',
    defaultValues: initialValues,
    resolver: yupResolver(schema)
  })

  const handleUpdateProfile = async (values: FormDataProfile) => {
    await onSubmit?.(values)
  }

  return (
    <Form colon={false} initialValues={initialValues} onFinish={handleSubmit(handleUpdateProfile)}>
      <div className='flex gap-5'>
        <Upload
          name='avatar'
          listType='picture'
          className='block h-[100px] w-[100px]'
          showUploadList={false}
          action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
        >
          <Image
            className='overflow-hidden rounded-full'
            alt='image'
            src='https://salt.tikicdn.com/cache/512x512/ts/avatar/03/65/b2/4c98456da9487007e081105f3675b4fa.jpg'
          />
        </Upload>

        <div className='w-[700px]'>
          <InputField label='Name' control={control} name='name' placeholder='Thêm tên' classNameInput='py-2' />
          <InputField label='Email' control={control} name='email' placeholder='abc@email.com' classNameInput='py-2' />
          <InputField
            label='Phone'
            control={control}
            name='phone'
            placeholder='Thêm số điện thoại'
            classNameInput='py-2'
          />
          <InputField
            label='Address'
            control={control}
            name='address'
            placeholder='Thêm địa chỉ'
            classNameInput='py-2'
          />
        </div>
      </div>

      <Button
        loading={isSubmitting}
        disabled={!isValid}
        type='primary'
        htmlType='submit'
        className='mx-auto block h-10 w-[176px] rounded bg-[#0b74e5]'
      >
        {t('save change')}
      </Button>
    </Form>
  )
}
