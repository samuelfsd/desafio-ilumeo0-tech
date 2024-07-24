import { PointType } from "./PointType"

export interface UserType {
  id: number
  name?: string
  email?: string
  password?: string
  code: string
  points: PointType[]
}