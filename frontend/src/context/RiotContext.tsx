import React, { ReactNode, createContext, useContext, useState } from "react";
import { RiotAuth } from "../interfaces/Valorant";

interface RiotContextProps {
  riotUser: RiotAuth;
  login: (userData: RiotAuth) => void;
  logout: () => void;
}

interface ComponentProps {
  children: ReactNode;
}

const defaultRiotUser: RiotAuth = {
  puuid: "",
  gameName: "",
  tagLine: "",
};

const defaultRiotContext: RiotContextProps = {
  riotUser: defaultRiotUser,
  login: () => {},
  logout: () => {},
};

export const RiotContext = createContext<RiotContextProps>(defaultRiotContext);

export const RiotProvider: React.FC<ComponentProps> = ({ children }) => {
  const [riotUser, setRiotUser] = useState<RiotAuth>(defaultRiotUser);

  const login = (userData: RiotAuth) => {
    setRiotUser(userData);
  };

  const logout = () => {
    setRiotUser(defaultRiotUser);
  };

  return (
    <RiotContext.Provider value={{ riotUser, login, logout }}>
      {children}
    </RiotContext.Provider>
  );
};

export const useRiot = () => {
  return useContext(RiotContext);
};
