import { API_ENDPOINT } from '@/lib/constants/api-urls';
import { LoginFormValues } from '../types/authentication.type';
import { useMutateData } from '@/lib/hooks/use-mutate-data';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchema } from '../data/schema';
import { DefaultLoginForm } from '../data/default';
import { getToken, saveToken } from '@/lib/utility//token';
import { AuthResponse } from '@/lib/types/auth-response.type';
import { PAGE_URLS } from '@/lib/constants/page-urls';
import { useEffect } from 'react';
import { useToast } from '@/lib/hooks/use-toast';
import { AUTH_TOKEN_NAME } from '@/lib/constants/common';
// import useGetData from '@/lib/hooks/use-get-data';
// import { useAuthContext } from '@/lib/contexts/auth-context';

const useAuthentication = () => {
  const {
    AUTH: { LOGIN }
  } = API_ENDPOINT;
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const { toast } = useToast();
  const token = getToken(AUTH_TOKEN_NAME);
  // const { getProfile } = useAuthContext();

  const formLogin = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: DefaultLoginForm,
    mode: 'onChange'
  });

  const {
    // data: dataLogin,
    mutate: submitLogin,
    isPending: loading
  } = useMutateData<AuthResponse>({
    url: `${LOGIN}/`,
    method: 'post',
    options: {
      showNotif: false,
      notifSuccessText: 'Successfully logged in as Administrator',
      onSuccess: data => {
        // getProfile();
        saveToken(data);
      }
    }
  });

  // const { data: profile, isFetching: loadingProfile } = useGetData<any>(['profile'], PROFILE, {
  //   options: {
  //     enabled: !!dataLogin?.access_token
  //   }
  // });

  const submitData = () => {
    const objModel = { ...formLogin.getValues() };
    submitLogin({ body: objModel });
  };

  useEffect(() => {
    if (token) {
      const backUrl = query.get('backUrl');
      navigate(backUrl ? backUrl : PAGE_URLS.DASHBOARD);
      // toast({
      //   variant: 'primary',
      //   description: `you already logged in as ${profile.username}`
      // });
    }
  }, [navigate, query, toast, token]);

  return {
    formLogin,
    loading,
    // loadingProfile,
    submitData
  };
};

export default useAuthentication;
