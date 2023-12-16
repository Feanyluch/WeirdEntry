// components/ProtectedRoute.tsx
import { FC, ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../redux/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    console.log('user:', user);
    console.log('redirectPath:', redirectPath);

    if (!user) {
      // Save the requested path if the user is not logged in
      setRedirectPath(router.pathname);
      // Redirect to login page
      router.replace('/login');
    } else if (redirectPath) {
      // If the user is logged in and there's a saved path, trigger navigation after login
      console.log('Navigating back to:', redirectPath);
      router.replace(redirectPath);
      setRedirectPath(null); // Reset the saved path
    }
  }, [user, redirectPath, router.pathname]);

  if (!user) {
    // Return null when the user is not authenticated
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
