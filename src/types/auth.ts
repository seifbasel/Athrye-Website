export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignupCredentials = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthTokens = {
  access: string;
  refresh: string;
};

export type AuthResponse = {
  user: AuthUser;
  tokens: AuthTokens;
};
