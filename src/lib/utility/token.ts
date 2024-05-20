import Cookies from 'js-cookie';
import { AUTH_REFRESH_TOKEN_NAME, AUTH_TOKEN_NAME } from '@/lib/constants/common';
import { AuthResponse } from '@/lib/types/auth-response.type';
import axios from 'axios';
import { addDays } from 'date-fns';

export const getToken = (tokenName: string): any => {
  const ress = Cookies.get(tokenName);
  return ress;
};

export const setToken = (tokenName: string, token: string, expires?: Date) => {
  Cookies.set(tokenName, token, { expires, sameSite: 'strict' });
};

export const saveToken = (data: AuthResponse) => {
  const { access_token: token, refreshToken } = data;
  const { exp = -1 } = JSON.parse(window.atob(token.split('.')[1]));
  const expires = new Date(exp * 1000);
  setToken(AUTH_TOKEN_NAME, token, addDays(expires, 1));
  setToken(AUTH_REFRESH_TOKEN_NAME, refreshToken, addDays(expires, 30));
  axios.defaults.headers.common = {
    Authorization: `Bearer ${token}`
  };
};

export const removeToken = (tokenName: string): void => {
  try {
    Cookies.remove(tokenName);
  } catch (e) {
    console.log(e);
  }
};

export const removeAuth = () => {
  removeToken(AUTH_TOKEN_NAME);
  removeToken(AUTH_REFRESH_TOKEN_NAME);
};
