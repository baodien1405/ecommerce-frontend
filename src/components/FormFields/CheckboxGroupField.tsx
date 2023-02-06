import { Checkbox, Space } from 'antd'
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
  disabled,
  direction = 'vertical',
  options,
  className,
  value,
  defaultValue,
  onChange
}: CheckboxGroupFieldProps) {
  return (
    <Checkbox.Group
      onChange={onChange}
      value={value}
      disabled={disabled}
      className={className}
      defaultValue={defaultValue}
      name={name}
    >
      <Space direction={direction}>
        {options.map((option, index) => (
          <Checkbox key={index} value={option.value}>
            <span className='text-xs capitalize text-[#38383d]'>{option.label}</span>
          </Checkbox>
        ))}
      </Space>
    </Checkbox.Group>
  )
}
