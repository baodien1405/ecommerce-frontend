import { forwardRef, useEffect, useState } from 'react'
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
  ({ src: _src, alt, fallback: customFallback = images.noImage, className, ...props }, ref) => {
    const classes = classNames('overflow-hidden', className)
    const [src, setSrc] = useState(_src)

    useEffect(() => {
      setSrc(_src)
    }, [_src])

    const handleError = () => {
      setSrc(customFallback)
    }

    return <img ref={ref} className={classes} src={src} alt={alt} {...props} onError={handleError} />
  }
)

export default Image
