import { AxiosResponse } from "axios";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import {
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthApi, IResponse } from "../services/api";
import { AccessTokenPayload } from "../services/api/Auth";
import { apiClient } from "../services/api/base";

interface ContextValue {
  currentUser: AccessTokenPayload | null;
  accessToken: string | null;
  signUp: (
    email: string,
    password: string
  ) => Promise<AxiosResponse<IResponse>>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<ContextValue>({} as ContextValue);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AccessTokenPayload | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  const signUp = async (
    email: string,
    password: string
  ): Promise<AxiosResponse<{ message: string }>> => {
    return AuthApi.signUp(email, password);
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    const res = await AuthApi.signIn(email, password);
    const accessToken = res.data.accessToken;
    setAccessToken(accessToken);
    setCurrentUser(jwt_decode<AccessTokenPayload>(accessToken));
    apiClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
    router.push("/");
  };

  const logOut = async (): Promise<void> => {
    await AuthApi.logOut();
    setAccessToken(null);
    setCurrentUser(null);
    router.push("/signin");
    window.localStorage.setItem("logOut", Date.now().toString());
  };

  useEffect(() => {
    const refreshToken = async (): Promise<void> => {
      const refreshTokenExists = (await AuthApi.verifyCurrentUser()).data;

      if (refreshTokenExists) {
        try {
          const res = await AuthApi.refreshToken();
          const newAccessToken = res.data.accessToken;
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;

          // Refresh tokens every 15 minutes - 5000ms
          setTimeout(async () => {
            await refreshToken();
          }, 900 * 1000 - 5000);

          setAccessToken(newAccessToken);
          setCurrentUser(jwt_decode<AccessTokenPayload>(newAccessToken));
        } catch (error) {
          console.error("Could not refresh token");
        }
      }
      setIsLoading(false);
    };

    refreshToken();
  }, []);

  // Logs out of all tabs
  useEffect(() => {
    const syncLogout = async (event: StorageEvent): Promise<void> => {
      if (event.key === "logOut") {
        router.push("/signin");
      }
    };

    window.addEventListener("storage", syncLogout);

    return (): void => {
      window.removeEventListener("storage", syncLogout);
    };
  }, []);

  const value: ContextValue = {
    currentUser,
    accessToken,
    signUp,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
