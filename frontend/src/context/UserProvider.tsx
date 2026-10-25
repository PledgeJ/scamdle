import { useState } from "react";
import { UserContext } from "./UserContext";

interface ProviderProps {
  children: React.ReactNode;
}

export function UserProvider({
  children,
}: ProviderProps): React.JSX.Element {
  const [user, setUser] = useState<string>('')
  const [pinkMode, setPinkMode] = useState<boolean>(false)

  const logout = () => {
    setUser('')
  }

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        logout, 
        pinkMode, 
        setPinkMode,
        setUser
    }}>
      {children}
    </UserContext.Provider>
  )
}