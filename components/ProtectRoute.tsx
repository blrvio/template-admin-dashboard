// components/ProtectRoute.tsx
"use client";
import { useAuth } from '@/src/contexts/auth.context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && !loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // or a placeholder while redirecting
  }

  return children;
};

export default ProtectRoute;
