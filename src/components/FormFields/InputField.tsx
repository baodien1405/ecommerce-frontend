import cn from 'classnames'
import { InputHTMLAttributes } from 'react'
import { Control, useController } from 'react-hook-form'

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  inputClassName?: string
  label?: string
  note?: string
  type?: string
  shadow?: boolean
  variant?: 'normal' | 'solid' | 'outline'
  name: string
  control?: Control<any>
}

const classes = {
  root: 'h-11 px-5 bg-input-bg w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border border-solid border-input-border transition-all ease-in-out duration-300 focus-within:outline-none-override placeholder:text-gray placeholder:transition-opacity focus:placeholder:opacity-0 hover:border-accent focus:border-accent',
  error: 'border border-red focus:border-red'
}

export const InputField = ({
  className,
  label,
  note,
  name,
  type = 'text',
  inputClassName,
  control,
  ...rest
}: InputFieldProps) => {
  const {
    field: { onBlur, onChange, value, ref },
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

      <input
        id={name}
        name={name}
        type={type}
        className={rootClassName}
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck='false'
        aria-invalid={error ? 'true' : 'false'}
        value={value}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
      />

      {note && <p className='mt-2 text-xs text-body'>{note}</p>}
      {error?.message && <p className='my-2 text-start text-xs text-red'>{error.message}</p>}
    </div>
  )
}
