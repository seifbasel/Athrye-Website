import type { AuthResponse } from "@/types/auth";

export const MOCK_LOGIN_USER: AuthResponse = {
  user: {
    id: "user-1",
    email: "collector@coinat.com",
    firstName: "James",
    lastName: "Sterling",
    avatar: "/coin1.jpg",
  },
  tokens: {
    access: "mock-access-token",
    refresh: "mock-refresh-token",
  },
};
