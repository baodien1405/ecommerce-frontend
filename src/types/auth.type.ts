export interface FormDataLogin {
  email: string
  password: string
}

export interface FormDataRegister {
  email: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  status: string
  message: string
  access_token: string
  refresh_token: string
}
