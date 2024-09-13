import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useUser } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../Api/auth";

export const useToken = () => {
  const { login } = useUser();
  const [cookies] = useCookies();
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const check = async () => {
    try {
      const data = await checkAuth(cookies.token, "");
      const { user } = data;
      login(user);
    } catch (error) {
      nav("/auth");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    check();
  }, []);

  return { loading };
};
