import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { InputField, PasswordField } from '@/components/FormFields'
import { FormDataLogin } from '@/types'
import { useLoginFormSchema } from '@/hooks'
import Button from '@/components/Button'
import { Link } from 'react-router-dom'
import { path } from '@/constants'

export interface LoginFormProps {
  loading?: boolean
  onSubmit?: (values: FormDataLogin) => void
}

export function LoginForm({ loading, onSubmit }: LoginFormProps) {
  const [t] = useTranslation('login')
  const schema = useLoginFormSchema()

  const { control, handleSubmit } = useForm<FormDataLogin>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleLogin = async (values: FormDataLogin) => {
    await onSubmit?.(values)
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <InputField label='E-mail' name='email' control={control} placeholder='Your E-mail address' className='mb-5' />

      <PasswordField label='Password' name='password' control={control} placeholder='Your password' className='mb-4' />

      <div className='mb-4 text-center'>
        <Link to={path.forgotPassword} className='text-btn'>
          {t('FORGOT_PASSWORD')}
        </Link>
      </div>

      <Button
        loading={loading}
        disabled={loading}
        variant='primary'
        htmlType='submit'
        size='large'
        className='mx-auto w-full'
      >
        {t('SIGN_IN')}
      </Button>
    </form>
  )
}
