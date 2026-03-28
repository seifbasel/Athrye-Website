"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  loginUser,
  registerUser,
  googleLogin,
  appleLogin,
} from "@/services/auth.service";
import { AuthUser, LoginCredentials, SignupCredentials } from "@/types/auth";

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

type AuthContextValue = AuthState & {
  login: (c: LoginCredentials) => Promise<void>;
  signup: (c: SignupCredentials) => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<void>;
  loginWithApple: (code: string, idToken: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("coinat_user");
      if (stored)
        setState({
          user: JSON.parse(stored),
          isAuthenticated: true,
          isLoading: false,
        });
      else setState((s) => ({ ...s, isLoading: false }));
    } catch {
      setState((s) => ({ ...s, isLoading: false }));
    }
  }, []);

  const setUser = (user: AuthUser) => {
    localStorage.setItem("coinat_user", JSON.stringify(user));
    setState({ user, isAuthenticated: true, isLoading: false });
  };

  const login = useCallback(async (c: LoginCredentials) => {
    const { user, tokens } = await loginUser(c);
    localStorage.setItem("coinat_tokens", JSON.stringify(tokens));
    setUser(user);
  }, []);

  const signup = useCallback(async (c: SignupCredentials) => {
    const { user, tokens } = await registerUser(c);
    localStorage.setItem("coinat_tokens", JSON.stringify(tokens));
    setUser(user);
  }, []);

  const loginWithGoogle = useCallback(async (idToken: string) => {
    const { user, tokens } = await googleLogin(idToken);
    localStorage.setItem("coinat_tokens", JSON.stringify(tokens));
    setUser(user);
  }, []);

  const loginWithApple = useCallback(async (code: string, idToken: string) => {
    const { user, tokens } = await appleLogin(code, idToken);
    localStorage.setItem("coinat_tokens", JSON.stringify(tokens));
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("coinat_user");
    localStorage.removeItem("coinat_tokens");
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        loginWithGoogle,
        loginWithApple,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
