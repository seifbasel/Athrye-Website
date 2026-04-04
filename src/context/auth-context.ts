import type {
  AuthResponse,
  LoginCredentials,
  SignupCredentials,
} from "@/types/auth";
import { MOCK_LOGIN_USER } from "@/mocks/auth";

export type AuthContextValue = {
  user: AuthResponse["user"] | null;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  signup: (credentials: SignupCredentials) => Promise<AuthResponse>;
  loginWithGoogle: (token: string) => Promise<AuthResponse>;
  loginWithApple: (code: string, token: string) => Promise<AuthResponse>;
};

const mockAuthResponse = async () => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return MOCK_LOGIN_USER;
};

export function useAuth(): AuthContextValue {
  return {
    user: MOCK_LOGIN_USER.user,
    login: async (_credentials) => mockAuthResponse(),
    signup: async (_credentials) => mockAuthResponse(),
    loginWithGoogle: async (_token) => mockAuthResponse(),
    loginWithApple: async (_code, _token) => mockAuthResponse(),
  };
}
