interface DefaultLayoutProps {
  children?: React.ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return <div>{children}</div>
}
