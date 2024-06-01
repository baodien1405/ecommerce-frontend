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
  root: 'py-3 px-4 w-full rounded-lg appearance-none transition duration-300 ease-in-out focus:outline-none focus:ring-0 placeholder:opacity-70 placeholder:text-sm placeholder:text-[#6b7280] placeholder:transition-opacity',
  normal: 'bg-input-bg border border-solid border-input-border focus:shadow focus:border-accent',
  solid: 'bg-input-bg border border-border-100 focus:border-accent',
  outline: 'bg-input-bg border border-border-base focus:border-accent',
  error: 'border border-red focus:border-red',
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
      {label && (
        <label htmlFor={name} className='mb-[10px] block w-fit text-[12px] font-bold text-gray'>
          {label}
        </label>
      )}

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

      {error && <p className='text-red-500 my-1 text-xs'>{error.message}</p>}
    </div>
  )
}
