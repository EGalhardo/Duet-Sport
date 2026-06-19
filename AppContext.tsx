import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { storageService } from '../services/storageService';
import { supabase } from '../lib/supabase';

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
}

interface AppContextType {
  auth: AuthState;
  login: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    // Verificar sessão atual no Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuth({
          isLoggedIn: true,
          user: {
            id: session.user.id,
            name: session.user.user_metadata?.full_name || 'Apostador',
            email: session.user.email || '',
            avatar: session.user.user_metadata?.avatar_url || 'https://i.postimg.cc/Nj00CMbd/Foto-Edlasio.png',
          },
          isLoading: false
        });
      } else {
        // Fallback local se não houver Supabase
        const savedAuth = localStorage.getItem('duet:auth') === '1';
        const profile = storageService.getUserProfile();
        setAuth({
          isLoggedIn: savedAuth,
          user: savedAuth ? {
            id: 'me',
            name: profile.name,
            email: 'edlasio@example.com',
            avatar: profile.photo,
          } : null,
          isLoading: false
        });
      }
    });

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuth({
          isLoggedIn: true,
          user: {
            id: session.user.id,
            name: session.user.user_metadata?.full_name || 'Apostador',
            email: session.user.email || '',
            avatar: session.user.user_metadata?.avatar_url || 'https://i.postimg.cc/Nj00CMbd/Foto-Edlasio.png',
          },
          isLoading: false
        });
      } else {
        setAuth({
          isLoggedIn: false,
          user: null,
          isLoading: false
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = React.useCallback(() => {
    // Mantemos a simulação visual do login local enquanto a UI não usa totalmente o Supabase para auth por email
    const profile = storageService.getUserProfile();
    setAuth({
      isLoggedIn: true,
      user: {
        id: 'me',
        name: profile.name,
        email: 'edlasio@example.com',
        avatar: profile.photo,
      },
      isLoading: false
    });
    localStorage.setItem('duet:auth', '1');
  }, []);

  const logout = React.useCallback(async () => {
    await supabase.auth.signOut();
    setAuth({
      isLoggedIn: false,
      user: null,
      isLoading: false
    });
    localStorage.removeItem('duet:auth');
  }, []);

  const value = React.useMemo(() => ({ auth, login, logout }), [auth, login, logout]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
