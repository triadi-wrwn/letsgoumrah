import { createContext, useContext, useMemo } from 'react';
import { getToken } from '@/lib/utility/token';
import { AUTH_TOKEN_NAME } from '@/lib/constants/common';
import { API_ENDPOINT } from '@/lib/constants/api-urls';
import { Profile } from '@/lib/types/auth-response.type';
import useGetData from '@/lib/hooks/use-get-data';
import { AuthContextTypes, AuthProviderProps } from './auth-context.type';

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const token = getToken(AUTH_TOKEN_NAME);
  const isAuthenticated = useMemo(() => !!token, [token]);
  const { data: currentUser, refetch: getProfile } = useGetData<Profile>(['profile'], API_ENDPOINT.AUTH.PROFILE, {
    options: {
      enabled: isAuthenticated
    }
  });
  const authProviderValue = useMemo(
    () => ({
      isAuthenticated,
      currentUser,
      token,
      getProfile
    }),
    [isAuthenticated, currentUser, token, getProfile]
  );

  return <AuthContext.Provider value={authProviderValue}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('"useAuthContext" must be used within "AuthProvider"');
  }

  return context;
};

export { AuthProvider, useAuthContext };
