import cn from 'classnames'
import { InputHTMLAttributes } from 'react'
import { Control, useController } from 'react-hook-form'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  inputClassName?: string
  label?: string
  note?: string
  name: string
  type?: string
  shadow?: boolean
  variant?: 'normal' | 'solid' | 'outline'
  control?: Control<any>
}
const classes = {
  root: 'px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0',
  normal: 'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent',
  solid: 'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
  outline: 'border border-border-base focus:border-accent',
  error: 'border border-red-500 focus:border-red-500',
  shadow: 'focus:shadow'
}

export const InputField = ({
  className,
  label,
  note,
  name,
  variant = 'normal',
  shadow = false,
  type = 'text',
  inputClassName,
  control,
  ...rest
}: Props) => {
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
      [classes.normal]: variant === 'normal',
      [classes.solid]: variant === 'solid',
      [classes.outline]: variant === 'outline'
    },
    {
      [classes.shadow]: shadow,
      [classes.error]: invalid
    },
    inputClassName
  )

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className='leading-non mb-3 block text-sm font-semibold text-body'>
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
      {error && <p className='my-2 text-start text-xs text-red-500'>{error.message}</p>}
    </div>
  )
}
