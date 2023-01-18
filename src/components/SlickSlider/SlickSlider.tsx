import Slider from 'react-slick'
import Image from '@/components/Image'

interface SlickSliderProps {
  imageList: Array<string>
}

export default function SlickSlider({ imageList }: SlickSliderProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  }

  return (
    <Slider {...settings} className='rounded bg-orange p-4'>
      {imageList.map((image) => (
        <div className='overflow-hidden' key={image}>
          <Image key={image} src={image} alt={image} className='h-[274px] w-full rounded-lg object-cover' />
        </div>
      ))}
    </Slider>
  )
}
