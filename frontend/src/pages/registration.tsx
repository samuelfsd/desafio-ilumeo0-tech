/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DVjKRuc838D
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Registration() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <div className="flex-1 flex items-center justify-center bg-[#0F172A] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Nome
              </Label>
              <Input id="name" type="text" placeholder="Entre com o seu nome" className="bg-gray-800 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                E-mail
              </Label>
              <Input id="email" type="email" placeholder="Entre com o seu email" className="bg-gray-800 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="bg-gray-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code" className="text-white">
                Código
              </Label>
              <Input id="code" type="text" placeholder="Enter your code" className="bg-gray-800 text-white" />
            </div>
          </div>
          <div className="text-center">
            <Button className="w-full">Cadastrar</Button>
          </div>
        </div>
      </div>
    </div>
  )
}