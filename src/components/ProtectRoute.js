// components/ProtectRoute.js
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

const ProtectRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading]);

  if (loading || (!loading && !user)) {
    return <div>Loading...</div>; // Você pode substituir por um componente de carregamento
  }

  return children;
};

export default ProtectRoute;
