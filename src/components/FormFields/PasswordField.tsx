import { InputHTMLAttributes, forwardRef, useState } from 'react'
import cn from 'classnames'
import { EyeIcon, EyeOffIcon } from '@/components/Icons'
import { Control, useController } from 'react-hook-form'

export interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  inputClassName?: string
  label?: string
  name: string
  forgotPageLink?: string
  shadow?: boolean
  variant?: 'normal' | 'solid' | 'outline'
  control?: Control<any>
}

const variantClasses = {
  normal: 'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent',
  solid: 'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
  outline: 'border border-border-base focus:border-accent',
  error: 'border border-red-500 focus:border-red-500'
}

// eslint-disable-next-line react/display-name
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ className, inputClassName, label, name, variant = 'normal', shadow = false, control, ...rest }, ref) => {
    const [show, setShow] = useState(false)

    const {
      field: { onBlur, onChange, value, ref: refRHF },
      fieldState: { invalid, error }
    } = useController({
      name,
      control
    })

    return (
      <div className={className}>
        {label && (
          <label htmlFor={name} className='leading-non mb-3 block text-sm font-semibold text-body'>
            {label}
          </label>
        )}

        <div className='relative'>
          <input
            id={name}
            name={name}
            type={show ? 'text' : 'password'}
            ref={ref || refRHF}
            className={cn(
              'w-full appearance-none rounded py-3 pe-11 ps-4 text-sm text-heading transition duration-300 ease-in-out focus:outline-none focus:ring-0',
              shadow && 'focus:shadow',
              variantClasses[variant],
              inputClassName,
              {
                [variantClasses.error]: invalid
              }
            )}
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
            spellCheck='false'
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            {...rest}
          />

          <label
            htmlFor={name}
            className='absolute end-4 top-5 -mt-2 cursor-pointer text-body'
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? <EyeOffIcon className='h-6 w-6' /> : <EyeIcon className='h-6 w-6' />}
          </label>
        </div>

        {error && <p className='my-2 text-start text-xs text-red-500'>{error.message}</p>}
      </div>
    )
  }
)
