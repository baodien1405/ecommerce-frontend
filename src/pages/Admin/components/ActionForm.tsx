import { useEffect } from 'react'
import { Button, Form } from 'antd'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SelectedField } from '@/components/FormFields'
import { useActionFormSchema } from '@/hooks'
import { FormDataAction } from '@/types'

export interface ActionFormProps {
  disabled?: boolean
  loading?: boolean
  isSuccess?: boolean
  initialValues?: FormDataAction
  onSubmit?: (formValues: FormDataAction) => void
}

export function ActionForm({ loading, disabled, isSuccess, initialValues, onSubmit }: ActionFormProps) {
  const [form] = Form.useForm()
  const schema = useActionFormSchema()

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm<FormDataAction>({
    mode: 'onChange',
    defaultValues: initialValues,
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (isSuccess) {
      reset()
      form.resetFields()
    }
  }, [isSuccess, form, reset])

  const handleActionFormSubmit = async (values: FormDataAction) => {
    await onSubmit?.(values)
  }

  return (
    <Form form={form} layout='inline' initialValues={initialValues} onFinish={handleSubmit(handleActionFormSubmit)}>
      <SelectedField
        name='action'
        control={control}
        placeholder='-- Action --'
        options={[{ label: 'Delete', value: 'delete' }]}
      />

      <Button
        loading={loading}
        disabled={loading || !isValid || disabled}
        type='primary'
        htmlType='submit'
        className='rounded bg-[#0b74e5]'
      >
        Perform
      </Button>
    </Form>
  )
}
