import { useForm } from 'react-hook-form'

import { SelectField } from '@/components/FormFields'

export interface ProductFiltersProps {
  loading?: boolean
  onSubmit?: (values: any) => void
}

export function ProductFilters({ onSubmit }: ProductFiltersProps) {
  const { control, handleSubmit } = useForm<any>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleLogin = async (values: any) => {
    await onSubmit?.(values)
  }

  return (
    <form className='grid gap-2.5 sm:grid-cols-2 sm:gap-[26px]' onSubmit={handleSubmit(handleLogin)}>
      <SelectField
        name='category'
        control={control}
        placeholder='-- Select one --'
        options={[
          { label: 'Clothes', value: 'clothes' },
          { label: 'Electronics', value: 'electronics' },
          { label: 'Furniture', value: 'furniture' }
        ]}
      />

      <SelectField
        name='price'
        control={control}
        placeholder='-- Select one --'
        options={[
          { label: 'Price: Low to High', value: 'price_min' },
          { label: 'Price: High to Low', value: 'price_max' }
        ]}
      />
    </form>
  )
}
