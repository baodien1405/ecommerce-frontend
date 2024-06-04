import Select from 'react-select'
import { Control, useController } from 'react-hook-form'

interface SelectOption {
  label: string
  value: string | number
}

interface SelectFieldProps {
  className?: string
  label?: string
  name: string
  placeholder?: string
  size?: 'small' | 'medium'
  disabled?: boolean
  clearable?: boolean
  control?: Control<any>
  options: Array<SelectOption>
  onChange?: (value?: string | number) => void
}

export const SelectField = ({
  className,
  label,
  name,
  placeholder,
  control,
  size,
  disabled,
  clearable,
  options,
  onChange: externalOnChange,
  ...rest
}: SelectFieldProps) => {
  const {
    field: { onBlur, onChange, value, ref }
  } = useController({
    name,
    control
  })
  const selectedOption = options.find((option) => option.value === value)

  const selectStyles = {
    option: (provided: any) => ({
      ...provided,
      fontSize: '0.875rem',
      color: 'var(--text)',
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 10,
      paddingBottom: 10,
      cursor: 'pointer',
      backgroundColor: 'var(--widget)',
      '&:hover': {
        color: 'var(--accent)',
        backgroundColor: 'var(--body)'
      }
    }),
    control: (_: any, state: any) => ({
      display: 'flex',
      alignItems: 'center',
      minHeight: size === 'small' ? 36 : 44,
      backgroundColor: 'var(--input-bg)',
      opacity: disabled ? 0.6 : 1,
      borderRadius: 8,
      border: '1px solid var(--input-border)',
      borderColor: state.isFocused ? 'var(--accent)' : 'var(--input-border)',
      boxShadow: state.menuIsOpen && '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: 'var(--accent)',
      '&:hover': {
        color: 'var(--accent)'
      }
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      color: 'var(--red)',
      padding: 0,
      cursor: 'pointer',

      '&:hover': {
        color: 'var(--red)'
      }
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: 6,
      border: '1px solid var(--input-border)',
      // boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      boxShadow: 'var(--shadow)',
      backgroundColor: 'var(--widget)'
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      paddingLeft: 16
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: '0.875rem',
      color: 'var(--text)'
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: 'var(--input-bg)',
      borderRadius: 9999,
      overflow: 'hidden',
      boxShadow: '0 0px 3px 0 rgba(0, 0, 0, 0.1), 0 0px 2px 0 rgba(0, 0, 0, 0.06)'
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      paddingLeft: 10,
      fontSize: '0.875rem',
      color: '#ffffff'
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      paddingLeft: 0,
      paddingRight: 8,
      color: '#ffffff',
      cursor: 'pointer',

      '&:hover': {
        backgroundColor: 'var(--input-bg)',
        color: '#F3F4F6'
      }
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: '0.875rem',
      color: 'rgba(107, 114, 128, 0.7)'
    }),
    noOptionsMessage: (provided: any) => ({
      ...provided,
      fontSize: '0.875rem',
      color: 'var(--text)'
    })
  }

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className='mb-[10px] block w-fit text-[12px] font-bold text-gray'>
          {label}
        </label>
      )}

      <Select
        id={name}
        styles={selectStyles}
        name={name}
        value={selectedOption}
        placeholder={placeholder}
        isDisabled={disabled}
        isClearable={clearable}
        options={options}
        ref={ref}
        onBlur={onBlur}
        onChange={(val) => {
          onChange(val?.value)
          externalOnChange?.(val?.value)
        }}
        {...rest}
      />
    </div>
  )
}
