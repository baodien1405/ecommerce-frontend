import { Form, Input, InputProps } from 'antd'
import { Control, useController } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'

export type InputFieldProps = InputProps &
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    name: string
    classNameInput?: string
    control?: Control<any>
  }

export function InputField({
  label,
  name,
  control,
  classNameInput,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  value: externalValue,
  ...rest
}: InputFieldProps) {
  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { invalid, error }
  } = useController({
    name,
    control
  })

  return (
    <Form.Item
      label={label ? <div className='flex w-20 items-start'>{label}</div> : undefined}
      name={name}
      help={error?.message}
      validateStatus={invalid ? 'error' : 'success'}
    >
      <Input className={classNameInput} value={value} ref={ref} onChange={onChange} onBlur={onBlur} {...rest} />
    </Form.Item>
  )
}
