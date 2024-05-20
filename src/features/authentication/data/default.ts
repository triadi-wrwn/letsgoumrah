import { LoginFormValues } from '../types/authentication.type';

const DefaultLoginForm: Partial<LoginFormValues> = {
  username: '',
  password: '',
  rememberMe: false
};

export { DefaultLoginForm };
