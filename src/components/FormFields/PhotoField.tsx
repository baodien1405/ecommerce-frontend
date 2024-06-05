import { ChangeEvent } from 'react'
import { ImageIcon } from 'lucide-react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import cn from 'classnames'

import Image from '@/components/Image'
import { ACCEPT_FILE_TYPES, MAX_SIZE_UPLOAD } from '@/constants'

export type PhotoFieldProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label?: string
}

export function PhotoField<T extends FieldValues>({ name, control, label }: PhotoFieldProps<T>) {
  const {
    field: { onChange, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  const previewUrl = value?.['previewUrl']
  const inputId = `photo-field-${name}`

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    onChange({
      file,
      previewUrl: url
    })
  }

  return (
    <div>
      {label && (
        <label htmlFor={name} className='mb-[10px] block w-fit text-[12px] font-bold text-gray'>
          {label}
        </label>
      )}

      <label
        className={cn('media-dropzone cursor-pointer overflow-hidden 2xl:col-span-2', {
          'border-red': error?.message
        })}
        htmlFor={inputId}
        ref={ref}
      >
        {previewUrl ? (
          <Image src={previewUrl} className='h-[180px] w-[246px]' alt={label || ''} />
        ) : (
          <div className='flex flex-col items-center gap-2.5'>
            <ImageIcon className='text-[20px] text-[#AEAEAE]' />
            <p
              className={cn('subheading-3', {
                '!text-red': error?.message
              })}
            >
              Browse image
            </p>
          </div>
        )}
      </label>

      {value?.file?.name && (
        <div
          className={cn('my-2 text-start text-xs text-green', {
            'text-red': value?.file?.size >= MAX_SIZE_UPLOAD || !ACCEPT_FILE_TYPES.includes(value?.file?.type)
          })}
        >
          {value?.file?.name}
        </div>
      )}

      {error?.message && <p className='my-2 text-start text-xs text-red'>{error.message}</p>}

      <input id={inputId} type='file' accept='image/*' hidden onChange={handleFileChange} />
    </div>
  )
}
