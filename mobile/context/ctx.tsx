import React from "react";
import { useStorageState } from "./useStorageState";
import { User } from "@/interfaces/User";

const AuthContext = React.createContext<{
  login: (userData: User, token: string) => void;
  logout: () => void;
  session?: string | null;
  user?: User | null;
  isLoading: boolean;
}>({
  login: () => null,
  logout: () => null,
  session: null,
  user: null,
  isLoading: false,
});

export const useSession = () => {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
};

export const SessionProvider = (props: React.PropsWithChildren) => {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [user, setUser] = React.useState<User | null>(null);

  return (
    <AuthContext.Provider
      value={{
        login: (userData: User, token: string) => {
          setSession(token);
          setUser(userData);
        },
        logout: () => {
          setSession(null);
          setUser(null);
        },
        session,
        user,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
