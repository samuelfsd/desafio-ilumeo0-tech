import { useContext, useState } from "react";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { axiosInstance } from "@/services/axiosInstance";
import { AuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function Auth() {
  const [code, setCode] = useState('');
  const { setUser } = useContext(AuthContext)!
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      console.log(code)
      const response = await axiosInstance.post('/users/authenticate', { code });

      const { user } = response.data
      setUser(user)
      navigate('/ponto')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#0F172A] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">Ponto Ilumeo</h2>
        </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input
              type="text"
              id="code"
              placeholder="Código do usuário"
              className="bg-gray-800 text-white"
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
          </div>
          <Button onClick={handleClick} type="submit" className="bg-yellow-500 w-full hover:bg-yellow-600">
            Confirmar
          </Button>
      </div>
    </div>
  );
}
