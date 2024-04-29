import { Dispatch, SetStateAction } from 'react'

interface SearchProps {
  placeholder?: string
  query: string
  setQuery: Dispatch<SetStateAction<string>>
  wrapperClass: string
}

const Search = ({ placeholder = 'Search...', query, setQuery, wrapperClass }: SearchProps) => {
  return (
    <div className={`relative ${wrapperClass || ''}`}>
      <input
        className='field-input !pr-[60px]'
        type='search'
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className={`field-btn !right-[40px] text-red transition ${query ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setQuery('')}
        aria-label='Clear all'
      >
        <i className='icon-xmark-regular' />
      </button>
      <button className='field-btn icon' aria-label='Search'>
        <i className='icon-magnifying-glass-solid' />
      </button>
    </div>
  )
}

export default Search
