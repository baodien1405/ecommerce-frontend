import { RadioGroup } from '@headlessui/react'
import { Control, useController } from 'react-hook-form'

export interface RadioOption {
  label?: string
  value: string
}

export interface RadioGroupFieldProps {
  name: string
  control: Control<any>
  label?: string
  disabled?: boolean
  options: RadioOption[]
  className?: string
}

export function RadioGroupField({ name, control, label, disabled, options, className }: RadioGroupFieldProps) {
  const {
    field: { onBlur, onChange, value },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className='text-body-dark leading-non mb-3 block text-sm font-semibold'>
          {label}
        </label>
      )}

      <RadioGroup name={name} value={value} onChange={onChange} onBlur={onBlur} disabled={disabled}>
        {options.map((option) => (
          <RadioGroup.Option key={option.value} value={option.value}>
            {({ checked }: { checked: boolean }) => (
              <div className='mb-2 flex items-center gap-3'>
                <input
                  id={option.value}
                  type='radio'
                  checked={checked}
                  className='h-5 w-5 cursor-pointer border-gray-300 accent-green focus:accent-green'
                />

                <label htmlFor={option.value} className='cursor-pointer'>
                  {option.label}
                </label>
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>

      {error && <p className='my-2 text-start text-xs text-red-500'>{error.message}</p>}
    </div>
  )
}
