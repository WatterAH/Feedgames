import React, { ReactNode, createContext, useContext, useState } from "react";
import { User, defaultUser } from "../interfaces/User";

interface UserContextProps {
  user: User;
  login: (userData: User) => void;
  logout: () => void;
}

interface PropsComponent {
  children: ReactNode;
}

const defaultUserContext: UserContextProps = {
  user: defaultUser,
  login: () => {},
  logout: () => {},
};

export const UserContext = createContext<UserContextProps>(defaultUserContext);

export const UserProvider: React.FC<PropsComponent> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(defaultUser);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
