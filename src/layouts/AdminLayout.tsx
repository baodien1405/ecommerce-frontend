import AdminHeader from '@/components/AdminHeader'

interface AdminLayoutProps {
  children?: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div>
      <AdminHeader />
      {children}
    </div>
  )
}
