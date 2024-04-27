import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { InputField, PasswordField } from '@/components/FormFields'
import { FormDataRegister } from '@/types'
import { useRegisterFormSchema } from '@/hooks'
import Button from '@/components/Button'

export interface RegisterFormProps {
  loading?: boolean
  onSubmit?: (values: FormDataRegister) => void
}

export function RegisterForm({ loading, onSubmit }: RegisterFormProps) {
  const [t] = useTranslation('register')
  const schema = useRegisterFormSchema()

  const { control, handleSubmit } = useForm<FormDataRegister>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const handleRegister = async (values: FormDataRegister) => {
    await onSubmit?.(values)
  }

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <InputField label='Name' name='name' control={control} placeholder='Your name' className='mb-5' />

      <InputField label='Email' name='email' control={control} placeholder='Your E-mail address' className='mb-5' />

      <PasswordField label='Password' name='password' control={control} placeholder='Your password' />

      <div className='mb-10 mt-4 flex flex-col items-center gap-6'>
        <div>{t('REGISTER_NOTE')}</div>

        <Button
          loading={loading}
          disabled={loading}
          variant='primary'
          htmlType='submit'
          size='large'
          className='mx-auto w-full'
        >
          {t('SIGN_UP')}
        </Button>
      </div>
    </form>
  )
}
