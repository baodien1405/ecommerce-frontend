import { Form, Input, InputProps } from 'antd'
import { Control, useController } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'

export type InputPasswordFieldProps = InputProps &
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    name: string
    classNameInput?: string
    control?: Control<any>
  }

export function InputPasswordField({
  label,
  name,
  classNameInput,
  control,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  value: externalValue,
  ...rest
}: InputPasswordFieldProps) {
  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { invalid, error }
  } = useController({
    name,
    control
  })

  return (
    <Form.Item label={label} name={name} help={error?.message} validateStatus={invalid ? 'error' : 'success'}>
      <Input.Password
        className={classNameInput}
        value={value}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
      />
    </Form.Item>
  )
}
