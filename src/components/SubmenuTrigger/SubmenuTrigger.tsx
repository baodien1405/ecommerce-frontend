import { EllipsisVerticalIcon } from '@/components/Icons'

interface SubmenuTriggerProps {
  className: string
  onClick: () => void
}

export default function SubmenuTrigger({ className = '', onClick }: SubmenuTriggerProps) {
  return (
    <button className={className} onClick={onClick} aria-label='Open submenu'>
      <EllipsisVerticalIcon height='36px' width='36px' />
    </button>
  )
}
