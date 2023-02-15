import { Form, Input, InputProps } from 'antd'

export interface InputFieldProps extends InputProps {
  label?: string
  name: string
  message?: string
  classNameInput?: string
}

export function InputField({ label, name, message, classNameInput, ...rest }: InputFieldProps) {
  return (
    <Form.Item
      label={<div className='flex w-20 items-start'>{label}</div>}
      name={name}
      rules={[{ required: false, message: message }]}
    >
      <Input {...rest} className={classNameInput} />
    </Form.Item>
  )
}
