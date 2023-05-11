import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useActionFormSchema } from '@/hooks'
import { FormDataAction } from '@/types'
import { SelectField } from '@/components/FormFields'
import Button from '@/components/Button'

export interface ActionFormProps {
  disabled?: boolean
  loading?: boolean
  isSuccess?: boolean
  onSubmit?: (formValues: FormDataAction) => void
}

export function ActionForm({ loading, disabled, isSuccess, onSubmit }: ActionFormProps) {
  const schema = useActionFormSchema()

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm<FormDataAction>({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (isSuccess) {
      reset()
    }
  }, [isSuccess, reset])

  const handleActionFormSubmit = async (values: FormDataAction) => {
    await onSubmit?.(values)
  }

  return (
    <form className='flex' onSubmit={handleSubmit(handleActionFormSubmit)}>
      <SelectField
        className='mr-2'
        name='action'
        size='small'
        control={control}
        placeholder='-- Action --'
        options={[{ label: 'Delete', value: 'delete' }]}
      />

      <Button loading={loading} size='small' disabled={loading || !isValid || disabled} htmlType='submit'>
        Perform
      </Button>
    </form>
  )
}
