import { Form, Select, SelectProps } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
import { Control, useController } from 'react-hook-form'

export interface SelectFieldProps extends SelectProps {
  name: string
  label?: string
  control: Control<any>
  options: DefaultOptionType[]
  classNameSelect?: string
  defaultValue?: string
}

export const SelectedField = ({
  name,
  control,
  label,
  options,
  classNameSelect,
  defaultValue,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  value: externalValue,
  ...rest
}: SelectFieldProps) => {
  const {
    field: { onBlur, value, onChange, ref },
    fieldState: { invalid, error }
  } = useController({
    name,
    control
  })

  return (
    <Form.Item name={name} label={label} help={error?.message} validateStatus={invalid ? 'error' : 'success'}>
      <Select
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNameSelect}
        ref={ref}
        {...rest}
      >
        {options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  )
}
