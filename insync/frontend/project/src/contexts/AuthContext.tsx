import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  role: 'admin' | 'care_team' | 'rt' | 'coordinator' | 'executive' | 'quality_manager';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS = [
  { username: 'admin', password: 'admin', role: 'admin' as const, name: 'Admin User' },
  { username: 'essam', password: 'password', role: 'care_team' as const, name: 'Essam' }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    const foundUser = MOCK_USERS.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (foundUser) {
      setUser({ username: foundUser.username, role: foundUser.role, name: foundUser.name });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
