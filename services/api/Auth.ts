import { IResponse } from ".";
import { get, post } from "./base";

export const AuthApi = {
  signUp: (email: string, password: string) =>
    post<IResponse>("/auth/signup", { email, password }),
  signIn: (email: string, password: string) =>
    post<{ accessToken: string }>("/auth/signin", { email, password }),
  logOut: () => get<boolean>("auth/logout"),
  verifyCurrentUser: () => get<boolean>("/auth/verify_user"),
  refreshToken: () => post<{ accessToken: string }>("/auth/refresh_token"),
};

export interface AccessTokenPayload {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

export interface RefreshTokenPayload {
  sub: number;
  tokenVersion: number;
  iat: number;
  exp: number;
}
