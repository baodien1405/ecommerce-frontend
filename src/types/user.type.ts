type Role = 'USER' | 'ADMIN' | '0001' | '0002'

export interface User {
  _id: string
  name: string
  email: string
  roles: Role[]
  isAdmin?: string
  phone?: string
  address?: string
  avatar?: string
}
