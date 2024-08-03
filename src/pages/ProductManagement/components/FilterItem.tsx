import cn from 'classnames'

interface FilterItemProps {
  text: string
  qty: number
  value: string
  active: string
  onClick: (value: string) => void
}

export const FilterItem = ({ text, qty = 0, value, active, onClick }: FilterItemProps) => {
  return (
    <button
      className={cn(
        'relative mr-3.5 inline-flex items-center gap-2 border-r-2 border-header pr-3.5 last:mr-0 last:border-0',
        {
          'text-header': value === active
        }
      )}
      onClick={() => onClick(value)}
    >
      <span className='subheading-2 duration-var(--transition) text-accent transition-colors group-hover:text-header group-focus:text-header group-active:text-header'>
        {text}
      </span>
      <span className='text-highlight-inverse text-sm'>({qty})</span>
    </button>
  )
}
