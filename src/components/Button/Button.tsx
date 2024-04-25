import cn from 'classnames'
import { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'social'
  outlineColor?: 'red' | 'green' | 'blue'
  size?: 'large' | 'medium' | 'small'
  active?: boolean
  loading?: boolean
  disabled?: boolean
  htmlType?: 'button' | 'submit'
}
const classes = {
  root: 'inline-flex items-center justify-center flex-shrink-0 font-semibold font-heading leading-none rounded-[23px] outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700 h-[44px]',
  primary: 'bg-green text-light border border-green-100 hover:bg-green-200 focus:bg-green-200',
  secondary: 'bg-accent text-light border-transparent hover:bg-[#0a458f] focus:bg-[#0a458f]',
  outline: 'border border-border-400 bg-widget text-body hover:text-light hover:bg-gray-400 h-[38px]',
  social: 'border border-accent !text-[14px] text-social-btn hover:bg-body gap-[15px]',
  red: 'border border-red text-red hover:text-white hover:bg-red',
  blue: 'border border-accent !text-accent hover:!text-white hover:!bg-accent',
  green: 'border border-green text-green hover:text-white hover:bg-green',
  loading: 'mr-2 h-4 w-4 ms-2 rounded-full border-2 border-transparent border-t-2 animate-spin',
  disabled: 'border-none bg-gray-300 text-body cursor-not-allowed',
  disabledOutline: 'border border-border-base text-muted cursor-not-allowed',
  small: 'px-[10px] py-0 !h-[26px] text-[12px]',
  medium: 'px-[15px] py-0 !h-[32px] text-[14px]',
  large: 'px-[26px] py-0 text-[16px]'
}

const Button = ({
  className,
  variant = 'primary',
  size = 'medium',
  outlineColor,
  children,
  active,
  htmlType,
  loading = false,
  disabled = false,
  ...rest
}: ButtonProps) => {
  const classesName = cn(
    classes.root,
    {
      [classes.primary]: !disabled && variant === 'primary',
      [classes.secondary]: !disabled && variant === 'secondary',
      [classes.disabled]: disabled && variant === 'primary',
      [classes.outline]: !disabled && variant === 'outline',
      [classes.social]: !disabled && variant === 'social',
      [classes.red]: !disabled && variant === 'outline' && outlineColor === 'red',
      [classes.blue]: !disabled && variant === 'outline' && outlineColor === 'blue',
      [classes.green]: !disabled && variant === 'outline' && outlineColor === 'green',
      [classes.disabledOutline]: disabled && variant === 'outline',
      [classes.small]: size === 'small',
      [classes.medium]: size === 'medium',
      [classes.large]: size === 'large'
    },
    className
  )

  return (
    <button
      type={htmlType}
      aria-pressed={active}
      data-variant={variant}
      className={classesName}
      disabled={disabled}
      {...rest}
    >
      {loading && (
        <span
          className={classes.loading}
          style={{
            borderTopColor: 'currentColor'
          }}
        />
      )}
      {children}
    </button>
  )
}

export default Button
