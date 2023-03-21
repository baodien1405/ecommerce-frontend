export default function Spinner() {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <div className='inline-block h-[50px] w-[50px] animate-spin rounded-full border-[3px] border-solid border-[#c3c3c399] border-t-[#636767]' />
    </div>
  )
}
