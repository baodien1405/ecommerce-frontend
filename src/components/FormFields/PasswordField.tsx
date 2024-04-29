import { InputHTMLAttributes, forwardRef, useState } from 'react'
import cn from 'classnames'
import { EyeIcon, EyeOffIcon } from '@/components/Icons'
import { Control, useController } from 'react-hook-form'

export interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  inputClassName?: string
  label?: string
  forgotPageLink?: string
  shadow?: boolean
  variant?: 'normal' | 'solid' | 'outline'
  name: string
  control?: Control<any>
}

const classes = {
  root: 'h-11 px-5 bg-input-bg w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border border-solid border-input-border transition-all ease-in-out duration-300 focus-within:outline-none-override placeholder:text-gray placeholder:transition-opacity focus:placeholder:opacity-0 hover:border-accent focus:border-accent',
  error: 'border border-red focus:border-red'
}

// eslint-disable-next-line react/display-name
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ className, inputClassName, label, name, control, ...rest }, ref) => {
    const [show, setShow] = useState(false)

    const {
      field: { onBlur, onChange, value, ref: refRHF },
      fieldState: { invalid, error }
    } = useController({
      name,
      control
    })

    const rootClassName = cn(
      classes.root,
      {
        [classes.error]: invalid
      },
      inputClassName
    )

    return (
      <div className={className}>
        {label && (
          <label htmlFor={name} className='mb-[10px] block w-fit text-[12px] font-bold text-gray'>
            {label}
          </label>
        )}

        <div className='relative'>
          <input
            id={name}
            name={name}
            type={show ? 'text' : 'password'}
            ref={ref || refRHF}
            className={rootClassName}
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
            {show ? <EyeOffIcon className='h-5 w-5 text-accent' /> : <EyeIcon className='h-5 w-5 text-accent' />}
          </label>
        </div>

        {error?.message && <p className='my-2 text-start text-xs text-red'>{error.message}</p>}
      </div>
    )
  }
)
