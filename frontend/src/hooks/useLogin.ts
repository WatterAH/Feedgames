import { useState } from "react";
import { loginApi } from "../Api/auth";
import { useUser } from "../context/AuthContext";
import { getExpirationDate } from "../functions/date";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useLogin = (username: string, password: string) => {
  const { login } = useUser();
  const [loading, setLoading] = useState(false);
  const [_cookies, setCookie] = useCookies();
  const nav = useNavigate();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await loginApi(username, password);
      const { user, token } = data;
      login(user);
      setCookie("token", token, {
        path: "/",
        expires: getExpirationDate(),
        secure: true,
        sameSite: "none",
      });
      nav("/");
    } catch (error: any) {
      const { message } = error;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading };
};
