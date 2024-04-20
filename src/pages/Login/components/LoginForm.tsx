import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { InputField, PasswordField } from '@/components/FormFields'
import { FormDataLogin } from '@/types'
import { useLoginFormSchema } from '@/hooks'
import Button from '@/components/Button'

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
      <InputField
        label='Email'
        name='email'
        control={control}
        placeholder='abc@gmail.com'
        className='mb-5'
        variant='outline'
      />

      <PasswordField label='Password' name='password' control={control} placeholder='************' variant='outline' />

      <Button
        loading={loading}
        disabled={loading}
        htmlType='submit'
        className='mx-auto mt-[16px] h-[48px] w-full border-[1px] px-3 py-2 text-base font-medium'
      >
        {t('SIGN_IN')}
      </Button>
    </form>
  )
}
