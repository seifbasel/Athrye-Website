import type { AuthResponse } from "@/types/auth";

export const MOCK_LOGIN_USER: AuthResponse = {
  user: {
    id: "user-1",
    email: "collector@athrye.com",
    firstName: "James",
    lastName: "Sterling",
    avatar: "/7.jpg",
  },
  tokens: {
    access: "mock-access-token",
    refresh: "mock-refresh-token",
  },
};
