import { SpinnerIcon } from '@/components/Icons'

export default function Spinner() {
  return (
    <div className='flex h-screen flex-1 items-center justify-center'>
      <div className='text-accent'>
        <SpinnerIcon />
      </div>
    </div>
  )
}
