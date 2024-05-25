import { DefaultOptionType } from 'antd/es/select'
import { Control, useController } from 'react-hook-form'
import { BasicSelect, MinimalSelect } from './SelectedField.styled'
import { ReactNode, useState } from 'react'
import { components } from 'react-select'

export interface SelectFieldProps {
  name: string
  label?: string
  control: Control<any>
  options: DefaultOptionType[]
  className?: string
  defaultValue?: string
  variant: 'basic' | 'minimal'
  placeholder?: string
  id?: string
  disabled?: boolean
  searchable?: boolean
}

export const SelectedField = ({
  name,
  control,
  label,
  options,
  defaultValue,
  variant,
  className,
  placeholder,
  id,
  disabled,
  searchable,
  ...rest
}: SelectFieldProps) => {
  const {
    field: { value, onChange, ref },
    fieldState: { invalid, error }
  } = useController({
    name,
    control
  })

  const [uniqueId] = useState(() => 'select_' + Math.random().toFixed(5).slice(2))

  // custom dropdown indicator
  const Control = ({ children }: { children: ReactNode }) => {
    return (
      <components.Control className={`${variant === 'basic' ? 'field-input' : ''}`} {...rest}>
        {children}
        <i className='icon icon-caret-down-solid' />
      </components.Control>
    )
  }

  const selectProps = {
    classNamePrefix: `select`,
    className: `${invalid ? 'is-invalid' : ''}`,
    id: id || uniqueId,
    isSearchable: searchable || false,
    isDisabled: disabled || false,
    options,
    value,
    onChange,
    placeholder: placeholder,
    openMenuOnFocus: true,
    blurInputOnSelect: true,
    ref: ref,
    defaultValue: defaultValue,
    onMenuClose: () => {
      const menuEl = document.querySelector(`#${id || uniqueId} .select__menu`)
      const containerEl = menuEl?.parentElement
      const clonedMenuEl = menuEl?.cloneNode(true) as HTMLElement

      if (!clonedMenuEl) return

      clonedMenuEl.classList.add('close')
      clonedMenuEl.addEventListener('animationend', () => {
        containerEl?.removeChild(clonedMenuEl)
      })

      containerEl?.appendChild(clonedMenuEl)
    },
    components: {
      Control
    }
  }

  return variant === 'basic' ? <BasicSelect {...selectProps} /> : <MinimalSelect {...selectProps} />
}
