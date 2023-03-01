import images from '@/assets/images'
import Image from '@/components/Image'

export default function NotFound() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Image className='h-[500px] w-[500px] object-cover' alt='image' src={images.pageNotFound} />
    </div>
  )
}
