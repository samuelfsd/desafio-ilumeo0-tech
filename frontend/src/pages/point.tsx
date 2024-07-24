import { useCallback, useContext, useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { PreviousDays } from "@/components/PreviousDays"
import { HeaderPoint } from "@/components/HeaderPoint"

import { axiosInstance } from "@/services/axiosInstance"
import { PointTypeEnum } from "@/utils/PointTypeEnum"
import { AuthContext } from "@/contexts/AuthContext"

type Timer = ReturnType<typeof setTimeout>

export function Point() {
  const { user } = useContext(AuthContext)!
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)

  const timer = useRef<number | Timer>()

  const formatTime = useCallback((time: any) => {
    const hours = Math.floor(time / 60 / 60 % 24).toString().padStart(2, '0')
    const minutes = Math.floor(time / 60 % 60).toString().padStart(2, '0')
    const seconds = Math.floor(time % 60).toString().padStart(2, '0')

    const formattedTime = `${hours}:${minutes}:${seconds}`
    return formattedTime
  }, [])

  const handleClick = async () => {
    setRunning(!running)
    if (running) {
      console.log(user?.id)
      const response = await axiosInstance.post(`/points/${user?.id}`, {
        type: PointTypeEnum.EXIT
      })
      console.log(response.data)
      setRunning(false)
    } else {
      const response = await axiosInstance.post(`/points/${user?.id}`, {
        type: PointTypeEnum.ENTRY
      })
      console.log(response)
      setRunning(true)
    }
  }

  useEffect(() => {
    if (running) {
      timer.current = setInterval(() => {
        setTime(pre => pre + 1)
      }, 1000)
    } else {
      clearInterval(timer.current)
    }
    return () => clearInterval(timer.current)
  }, [running])

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <HeaderPoint />

      <div className="flex-1 flex items-center justify-center bg-[#0F172A] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div>
          <h1 className="text-white scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {formatTime(time)}
          </h1>
          <p className="text-white leading-7 [&:not(:first-child)]:mt-1">
            Horas de hoje
          </p>
          </div>
          <div className="text-center">
            <Button onClick={handleClick} className="w-full bg-yellow-500 hover:bg-yellow-600 ">
              {running ? 'Hora de saída' : 'Hora de entrada' }
            </Button>
          </div>
        </div>
      </div>

      <PreviousDays />
    </div>
  )
}

