import { Form, Input, InputProps } from 'antd'

export interface InputPasswordFieldProps extends InputProps {
  label?: string
  name: string
  message?: string
  classNameInput?: string
}

export function InputPasswordField({ label, name, message, classNameInput, ...rest }: InputPasswordFieldProps) {
  return (
    <Form.Item label={label} name={name} rules={[{ required: true, message: message }]}>
      <Input.Password {...rest} className={classNameInput} />
    </Form.Item>
  )
}
