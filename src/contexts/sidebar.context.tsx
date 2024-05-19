import { useState, createContext, useContext, useEffect, ReactNode, Dispatch, SetStateAction } from 'react'
import { useLocation } from 'react-router-dom'

import { useScrollLock } from '@/hooks'

interface SidebarProviderProps {
  children: ReactNode
}

interface SidebarContextInterface {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const SidebarContext = createContext<SidebarContextInterface>({
  open: false,
  setOpen: () => null
})

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const setIsLocked = useScrollLock()

  // close sidebar when route changes
  useEffect(() => {
    setOpen(false)
  }, [location])

  useEffect(() => {
    if (open) {
      setIsLocked(true)
    } else {
      setIsLocked(false)
    }

    return () => {
      setIsLocked(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return <SidebarContext.Provider value={{ open, setOpen }}>{children}</SidebarContext.Provider>
}

export const useSidebar = () => useContext(SidebarContext)
