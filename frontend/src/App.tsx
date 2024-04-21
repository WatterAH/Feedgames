import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from "./auth/Auth";
import { Home } from "./home/Home";
import { UserProvider } from "./context/AuthContext";
import { CookiesProvider } from "react-cookie";
import { RiotProvider } from "./context/RiotContext";
import { Toaster } from "sonner";
import { TOS } from "./legal/TOS";
import { PP } from "./legal/PP";

// @ts-ignore
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
              <Route path="/terms-of-service" element={<TOS />}></Route>
              <Route path="/privacy-policy" element={<PP />}></Route>
            </Routes>
            <Toaster position="top-right" />
          </BrowserRouter>
        </RiotProvider>
      </UserProvider>
    </CookiesProvider>
  );
};
