/**
 * Auth Service — Mock
 * Each function documents the exact Django endpoint it maps to.
 * Swap: remove delay() + mock returns, uncomment fetch blocks, set BASE_URL.
 */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { AuthResponse, LoginCredentials, SignupCredentials } from "@/types/auth";

// TODO: const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const MOCK_USER = {
  id: "mock-1",
  email: "collector@coinat.com",
  firstName: "James",
  lastName: "Sterling",
};
const MOCK_TOKENS = { access: "mock-access", refresh: "mock-refresh" };

/** POST /api/auth/login/ → { user, tokens } */
export async function loginUser(c: LoginCredentials): Promise<AuthResponse> {
  // TODO:
  // const res = await fetch(`${BASE_URL}/auth/login/`, {
  //   method: "POST", headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(c),
  // });
  // if (!res.ok) throw new Error((await res.json()).detail ?? "Login failed");
  // return res.json();

  await delay(800);
  if (c.email === "fail@test.com") throw new Error("Invalid email or password.");
  return { user: { ...MOCK_USER, email: c.email }, tokens: MOCK_TOKENS };
}

/** POST /api/auth/register/ → { user, tokens } */
export async function registerUser(c: SignupCredentials): Promise<AuthResponse> {
  // TODO:
  // const { confirmPassword, ...body } = c;
  // const res = await fetch(`${BASE_URL}/auth/register/`, {
  //   method: "POST", headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(body),
  // });
  // if (!res.ok) throw new Error((await res.json()).detail ?? "Registration failed");
  // return res.json();

  await delay(900);
  return { user: { ...MOCK_USER, email: c.email, firstName: c.firstName, lastName: c.lastName }, tokens: MOCK_TOKENS };
}

/** POST /api/auth/token/refresh/ → { access } */
export async function refreshToken(_refresh: string): Promise<{ access: string }> {
  await delay(300);
  return { access: "new-mock-access" };
}

/** POST /api/auth/google/ → { user, tokens } */
export async function googleLogin(_idToken: string): Promise<AuthResponse> {
  // TODO: const res = await fetch(`${BASE_URL}/auth/google/`, { method: "POST", body: JSON.stringify({ token: _idToken }) });
  await delay(700);
  return { user: { ...MOCK_USER, email: "google@gmail.com" }, tokens: MOCK_TOKENS };
}

/** POST /api/auth/apple/ → { user, tokens } */
export async function appleLogin(_code: string, _idToken: string): Promise<AuthResponse> {
  // TODO: const res = await fetch(`${BASE_URL}/auth/apple/`, { method: "POST", body: JSON.stringify({ code: _code, id_token: _idToken }) });
  await delay(700);
  return { user: { ...MOCK_USER, email: "apple@icloud.com" }, tokens: MOCK_TOKENS };
}