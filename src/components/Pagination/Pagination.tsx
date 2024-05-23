import cn from 'classnames'

import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@/components/Icons'

interface PaginationProps {
  page: number
  count: number
  onChange: (page: number) => void
}

export default function Pagination({ page, count, onChange }: PaginationProps) {
  return (
    <div className='flex flex-wrap items-center gap-[18px] border-b border-input-border pb-6'>
      {page > 0 && (
        <button onClick={() => onChange(page - 1)} aria-label='Previous page' className='text-accent'>
          <ChevronDoubleLeftIcon width='22px' />
        </button>
      )}

      <div className='flex flex-wrap gap-2.5'>
        {[...Array(count)].map((_, i) => {
          return (
            <button
              className={cn('page-btn subheading-2', { active: i === page })}
              key={i}
              onClick={() => onChange(i)}
              disabled={page === i}
              aria-label={`Page ${i + 1}`}
            >
              {i + 1}
            </button>
          )
        })}
      </div>

      {page < count - 1 && (
        <button
          onClick={() => onChange(page + 1)}
          disabled={page + 1 === count}
          aria-label='Next page'
          className='text-accent'
        >
          <ChevronDoubleRightIcon width='22px' />
        </button>
      )}
    </div>
  )
}
