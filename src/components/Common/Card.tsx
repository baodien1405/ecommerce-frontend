import classNames from 'classnames'

interface Props {
  className?: string
  [key: string]: unknown
}

export function Card({ className, ...props }: Props) {
  const classes = classNames('bg-[#fff] rounded p-5 shadow md:p-8', className)

  return <div className={classes} {...props} />
}
