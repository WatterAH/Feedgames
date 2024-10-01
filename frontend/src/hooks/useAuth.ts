"use client";
import { useCallback, useState } from "react";
import { loginApi, registerApi } from "@/routes/auth";
import { useUser } from "@/context/AuthContext";
import { getExpirationDate } from "@/functions/date";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const { login } = useUser();
  const [loading, setLoading] = useState(false);
  const [, setCookie] = useCookies();
  const router = useRouter();

  const submit = useCallback(
    async (username: string, password: string) => {
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
        router.push("/");
      } catch (error: any) {
        const { message } = error;
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [login, router, setCookie]
  );

  return { submit, loading };
};

export const useRegister = () => {
  const { login } = useUser();
  const [loading, setLoading] = useState(false);
  const [, setCookie] = useCookies();
  const router = useRouter();

  const submit = useCallback(
    async (
      name: string,
      username: string,
      details: string,
      password: string
    ) => {
      try {
        setLoading(true);
        const data = await registerApi(name, username, details, password);
        const { user, token } = data;
        login(user);
        setCookie("token", token, {
          path: "/",
          expires: getExpirationDate(),
          secure: true,
          sameSite: "none",
        });
        router.push("/");
      } catch (error: any) {
        const { message } = error;
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [login, router, setCookie]
  );

  return { submit, loading };
};
