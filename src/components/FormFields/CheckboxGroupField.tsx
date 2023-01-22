import { Checkbox, Form, Space } from 'antd'
import { CheckboxOptionType, CheckboxValueType } from 'antd/es/checkbox/Group'

export interface CheckboxGroupFieldProps {
  name: string
  label?: string
  disabled?: boolean
  direction?: 'horizontal' | 'vertical'
  options: CheckboxOptionType[]
  className?: string
  value?: CheckboxValueType[]
  defaultValue?: CheckboxValueType[]
  onChange?: (checkedValue: CheckboxValueType[]) => void
}

export function CheckboxGroupField({
  name,
  label,
  disabled,
  direction = 'vertical',
  options,
  className,
  value,
  defaultValue,
  onChange
}: CheckboxGroupFieldProps) {
  return (
    <Form.Item name={name} label={label} help={''} validateStatus={''}>
      <Checkbox.Group
        onChange={onChange}
        value={value}
        disabled={disabled}
        className={className}
        defaultValue={defaultValue}
      >
        <Space direction={direction}>
          {options.map((option, index) => (
            <Checkbox key={index} value={option.value}>
              <span className='text-xs capitalize text-[#38383d]'>{option.label}</span>
            </Checkbox>
          ))}
        </Space>
      </Checkbox.Group>
    </Form.Item>
  )
}
