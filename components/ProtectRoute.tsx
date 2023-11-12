"use client"
import { ReactNode } from 'react';
import { useAuth } from '@/src/contexts/auth.context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectRouteProps {
  children: ReactNode;
}

const ProtectRoute = ({ children }: ProtectRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // Certifique-se de retornar `null` e não `undefined`
    return null; 
  }

  return <>{children}</>;
};

export default ProtectRoute;
