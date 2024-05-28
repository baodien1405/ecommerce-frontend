import Header from '@/components/Header'
import { path } from '@/constants'
import { useLocation } from 'react-router-dom'

interface MainLayoutProps {
  children?: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation()
  const notShowHeaderPaths: string[] = [path.login, path.register, path[404]]
  const withSidebar = !notShowHeaderPaths.includes(location.pathname)

  return (
    <div>
      {withSidebar && <Header />}
      {children}
    </div>
  )
}
