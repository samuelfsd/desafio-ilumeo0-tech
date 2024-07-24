import { PointTypeEnum } from "@/utils/PointTypeEnum"

export interface PointType {
  id: number
  date?: string
  type?: PointTypeEnum
  hour: string
  userId: number;
}