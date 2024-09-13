import { UserProvider } from "./context/AuthContext";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TOS } from "./app/Legal/TOS";
import { PP } from "./app/Legal/PP";
import Auth from "./app/Auth/Auth";
import Home from "./app/Home/Home";
import Register from "./app/Auth/Register";

export let URL = import.meta.env.VITE_SERVER_HOST;

const App = () => {
  return (
    <CookiesProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/reg" element={<Register />} />
            <Route path="/terms-of-service" element={<TOS />} />
            <Route path="/privacy-policy" element={<PP />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </CookiesProvider>
  );
};

export default App;
