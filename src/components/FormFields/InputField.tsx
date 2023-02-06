import { Form, Input, InputProps } from 'antd'

export interface InputFieldProps extends InputProps {
  label?: string
  name: string
  message?: string
  classNameInput?: string
}

export function InputField({ label, name, message, classNameInput, ...rest }: InputFieldProps) {
  return (
    <Form.Item label={label} name={name} rules={[{ required: true, message: message }]}>
      <Input {...rest} className={classNameInput} />
    </Form.Item>
  )
}
