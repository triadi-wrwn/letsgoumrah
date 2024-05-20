import { PAGE_URLS } from '@/lib/constants/page-urls';
import { useConfirmation } from '@/lib/hooks/use-confirmation';
import { removeAuth } from '@/lib/utility/token';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useSidebar = () => {
  const location = useLocation();
  const initialLastPath = location.pathname.split('/');
  const [lastPath, setLastPath] = useState<string>(initialLastPath[initialLastPath.length - 1]);
  const [secondLastPath, setSecondLastPath] = useState<string>(initialLastPath[initialLastPath.length - 2]);
  const { confirmation } = useConfirmation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    removeAuth();
    queryClient.removeQueries({ queryKey: ['profile'] });
    navigate(PAGE_URLS.AUTH.LOGIN);
  };

  const handleLogout = (pathname: string) => {
    if (pathname === 'logout') {
      confirmation({
        title: 'Logout Confirmation',
        description: 'Are you sure you want to logout?',
        confirmedText: 'Logout',
        onConfirm: () => logout()
      });
    }
  };
  useEffect(() => {
    const pathArr = location.pathname.split('/').filter(el => el);
    setLastPath(pathArr[pathArr.length - 1]);
    setSecondLastPath(pathArr[pathArr.length - 2]);
  }, [location.pathname]);

  return {
    handleLogout,
    lastPath,
    secondLastPath
  };
};

export default useSidebar;
