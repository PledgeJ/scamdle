import { createContext, useContext } from 'react';


export interface UserContextType {
  user: string;
  pinkMode: boolean;
  setPinkMode: (bool: boolean) => void;
  logout: () => void;
  setUser: (id: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
