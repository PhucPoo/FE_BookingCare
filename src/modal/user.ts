export interface User {
  id: number
  name: string
  email: string
  phoneNumber: string
  gender: any
  address: any
  password: string,
  birth: any
  createAt: string
  updateAt: string
  cccd: any
  role: Role | "USER" | "ADMIN"
}

export interface Role {
  id: number
  name: string
}
