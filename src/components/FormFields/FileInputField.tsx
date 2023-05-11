import cn from 'classnames'
import { useController, Control, UseFormRegister, UseFormWatch } from 'react-hook-form'
import { UploadIcon } from '@/components/Icons'

interface FileInputFieldProps {
  control: Control<any>
  label?: string
  name: string
  multiple?: boolean
  maxSize: number
  accept: string
  acceptFileTypes: Array<string>
  className?: string
  register: UseFormRegister<any>
  watch: UseFormWatch<any>
}

export const FileInputField = ({
  control,
  name,
  multiple = false,
  className,
  label,
  register,
  watch,
  accept,
  maxSize,
  acceptFileTypes
}: FileInputFieldProps) => {
  const {
    fieldState: { invalid, error }
  } = useController({
    name,
    control
  })

  const watchFile = watch(name)?.[0]

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className='text-body-dark leading-non mb-3 block text-sm font-semibold'>
          {label}
        </label>
      )}

      <div className='relative h-[60px] w-full'>
        <input className='hidden' type='file' id='file' multiple={multiple} accept={accept} {...register(name)} />
        <label
          htmlFor='file'
          className={cn(
            'z-1 absolute top-0 left-0 flex h-full w-full cursor-pointer items-center justify-center rounded border border-solid border-accent bg-white',
            {
              'border-red-500': invalid
            }
          )}
        >
          <UploadIcon className='text-muted-light' />
          <div className='ml-[10px] text-[18px] font-bold leading-[22px] text-body'>Upload</div>
        </label>
      </div>

      {watchFile?.name && (
        <div
          className={cn('text-accent', {
            'text-red-500': watchFile?.size >= maxSize || !acceptFileTypes.includes(watchFile?.type)
          })}
        >
          {watchFile?.name}
        </div>
      )}

      {error && <div className='text-red-500'>{error.message}</div>}
    </div>
  )
}
