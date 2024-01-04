import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from "./auth/Auth";
import { Home } from "./home/Home";
import { UserProvider } from "./context/AuthContext";

export let URL = "https://craftfeed.fly.dev";
// export let URL = "http://localhost:3000";

export const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};
