import { createContext, useContext } from 'react';

export interface User {
  username: string;
  dayComplete: boolean;
}

export interface UserContextType {
  user: User | null;
  pinkMode: boolean;
  setPinkMode: (bool: boolean) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
