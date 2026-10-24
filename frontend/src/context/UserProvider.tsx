import { useState } from "react";
import { UserContext, type User } from "./UserContext";
import { loginRequest } from "../services/login.api";

interface ProviderProps {
  children: React.ReactNode;
}

export function UserProvider({
  children,
}: ProviderProps): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null)
  const [pinkMode, setPinkMode] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const logout = () => {
    setUser(null)
    setError(null)
  }

  const login = async (username: string, pass: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const userData = await loginRequest({ username, password: pass });
      setUser(userData);
    } catch {
      setError('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        pinkMode, 
        setPinkMode,
        isLoading,
        error,
    }}>
      {children}
    </UserContext.Provider>
  )
}