'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, firebaseReady } from '@/lib/firebase';
import { SplashScreen } from '@/components/splash-screen';

type Role = 'superadmin' | 'admin' | 'warga';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  role: Role | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    if (!firebaseReady || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // In a real application, the user's role would be retrieved from
        // Firebase Auth Custom Claims, which must be set securely from a server.
        // For this prototype, we simulate roles based on email for demonstration.
        // You can register accounts with these emails to test different roles.
        const email = user.email || '';
        if (email.startsWith('superadmin@')) {
            setRole('superadmin');
        } else if (email.startsWith('admin@')) {
            setRole('admin');
        } else {
            setRole('warga');
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
