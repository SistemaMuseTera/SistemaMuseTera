export interface UserProfile {
  id: string
  name: string
  email: string
  professionalRegister?: string
  image?: string
  createdAt: Date
}

export interface SignUpData {
  name: string
  email: string
  password: string
  professionalRegister?: string
}

export interface SignInData {
  email: string
  password: string
} 