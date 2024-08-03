import cn from 'classnames'
import { useForm } from 'react-hook-form'

import { InputField } from '@/components/FormFields'
import { CloseIcon, SearchIcon } from '@/components/Icons'

interface SearchProps {
  placeholder?: string
  wrapperClass: string
}

const Search = ({ placeholder = 'Search...', wrapperClass }: SearchProps) => {
  const { control, setValue, watch } = useForm<{ search: string }>({
    defaultValues: {
      search: ''
    }
  })

  const watchSearch = watch('search')

  return (
    <div className={cn('relative', wrapperClass)}>
      <InputField name='search' control={control} placeholder={placeholder} className='' />

      {watchSearch ? (
        <CloseIcon
          className='absolute right-4 top-1/2 -translate-y-1/2 leading-[0] text-red transition hover:cursor-pointer'
          width='16px'
          height='16px'
          onClick={() => setValue('search', '')}
        />
      ) : (
        <SearchIcon
          width='20px'
          height='20px'
          className='absolute right-4 top-1/2 -translate-y-1/2 leading-[0] text-accent hover:cursor-pointer'
        />
      )}
    </div>
  )
}

export default Search
