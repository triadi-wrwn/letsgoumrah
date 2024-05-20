import { PAGE_URLS } from '@/lib/constants/page-urls';
import { useConfirmation } from '@/lib/hooks/use-confirmation';
import { removeAuth } from '@/lib/utility/token';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useTopbar = () => {
  const navigate = useNavigate();
  const { confirmation } = useConfirmation();
  const queryClient = useQueryClient();

  const logout = () => {
    removeAuth();
    queryClient.removeQueries({ queryKey: ['profile'] });
    navigate(PAGE_URLS.AUTH.LOGIN);
  };

  const handleLogout = () => {
    confirmation({
      title: 'Logout Confirmation',
      description: 'Are you sure you want to logout?',
      confirmedText: 'Logout',
      onConfirm: () => logout()
    });
  };

  return {
    handleLogout
  };
};

export default useTopbar;
