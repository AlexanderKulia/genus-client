import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export const AuthGuard: FunctionComponent = ({ children }) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) router.push("/signin");
  }, []);

  return <>{currentUser && children}</>;
};
