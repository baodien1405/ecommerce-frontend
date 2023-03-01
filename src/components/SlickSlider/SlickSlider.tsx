import { Carousel } from 'antd'
import Image from '@/components/Image'

interface SlickSliderProps {
  className?: string
  imageList: Array<string>
}

export default function SlickSlider({ imageList, className = '' }: SlickSliderProps) {
  return (
    <Carousel autoplay dots={true} className={`rounded-xl bg-orange ${className}`}>
      {imageList.map((image) => (
        <div className='h-[240px] overflow-hidden' key={image}>
          <Image key={image} src={image} alt={image} className='w-full rounded-lg object-cover' />
        </div>
      ))}
    </Carousel>
  )
}
