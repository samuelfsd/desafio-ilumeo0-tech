import { UserType } from '@/types/UserType';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface Props {
  children: React.ReactNode
}

interface AuthStateProps {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<null>>;
}

const AuthContext = createContext<AuthStateProps | null>(null);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };