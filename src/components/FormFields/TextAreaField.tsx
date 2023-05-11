import cn from 'classnames'
import { TextareaHTMLAttributes } from 'react'
import { Control, useController } from 'react-hook-form'

export interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  inputClassName?: string
  label?: string
  name: string
  error?: string
  shadow?: boolean
  control?: Control<any>
  variant?: 'normal' | 'solid' | 'outline'
}

const classes = {
  root: 'py-3 px-4 w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0',
  normal: 'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent',
  solid: 'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
  outline: 'border border-border-base focus:border-accent',
  error: 'border border-red-500 focus:border-red-500',
  shadow: 'focus:shadow'
}

export const TextAreaField = ({
  className,
  label,
  name,
  variant = 'normal',
  shadow = false,
  inputClassName,
  control,
  ...rest
}: TextAreaFieldProps) => {
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
      {label && <label className='text-body-dark mb-3 block text-sm font-semibold leading-none'>{label}</label>}

      <textarea
        id={name}
        name={name}
        className={rootClassName}
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck='false'
        rows={4}
        value={value}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
      />

      {error && <p className='my-1 text-xs text-red-500'>{error.message}</p>}
    </div>
  )
}
