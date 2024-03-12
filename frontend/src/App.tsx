import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from "./auth/Auth";
import { Home } from "./home/Home";
import { UserProvider } from "./context/AuthContext";
import { CookiesProvider } from "react-cookie";
import { RiotProvider } from "./context/RiotContext";

export let URL: string = import.meta.env.VITE_SERVER_HOST;

export const App = () => {
  return (
    <CookiesProvider>
      <UserProvider>
        <RiotProvider>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<Home />}></Route>
              <Route path="/auth" element={<Auth />}></Route>
            </Routes>
          </BrowserRouter>
        </RiotProvider>
      </UserProvider>
    </CookiesProvider>
  );
};
