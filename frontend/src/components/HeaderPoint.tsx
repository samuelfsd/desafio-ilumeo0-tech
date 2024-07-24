import { AuthContext } from "@/contexts/AuthContext"
import { useContext } from "react"

export function HeaderPoint() {
  const { user } = useContext(AuthContext)!

  return (
    <header className="bg-[#0F172A] px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-around">
      <div className="text-white font-bold">Usuário: {user?.code}</div>
      <div className="text-gray-400 text-sm">Relógio de ponto</div>
    </header>
  )
}