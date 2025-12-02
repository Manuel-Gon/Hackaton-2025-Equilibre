import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('equilibre_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error('Preencha todos os campos');
      }

      const mockUser = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email: email,
      };

      setUser(mockUser);
      localStorage.setItem('equilibre_user', JSON.stringify(mockUser));
      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      if (!name || !email || !password) {
        throw new Error('Preencha todos os campos');
      }

      const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
      };

      setUser(newUser);
      localStorage.setItem('equilibre_user', JSON.stringify(newUser));
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('equilibre_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};