import { forwardRef, useState } from 'react'
import classNames from 'classnames'
import images from '@/assets/images'

export interface ImageProps {
  src: string
  alt: string
  fallback?: string
  className?: string
  onClick?: () => void
}

// eslint-disable-next-line react/display-name
const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, fallback: customFallback = images.noImage, className, ...props }, ref) => {
    const classes = classNames('overflow-hidden', className)
    const [fallback, setFallback] = useState('')

    const handleError = () => {
      setFallback(customFallback)
    }

    return <img ref={ref} className={classes} src={fallback || src} alt={alt} {...props} onError={handleError} />
  }
)

export default Image
