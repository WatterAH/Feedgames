import { useCallback, useEffect, useState } from "react";
import { checkAuth, loginApi, registerApi } from "@/routes/auth";
import { useUser } from "@/context/AuthContext";
import { getExpirationDate } from "@/functions/date";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { defaultUser } from "@/interfaces/User";

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
        });
        toast.success(`Sesión iniciada como ${user.username}`);
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
          expires: getExpirationDate(),
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

export const useToken = () => {
  const { login } = useUser();
  const [cookies] = useCookies();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!cookies.token) {
      setLoading(false);
      login(defaultUser);
      router.push("/home");
      return;
    }

    const check = async () => {
      try {
        const data = await checkAuth(cookies.token);
        const { user } = data;
        login(user);
      } catch (error: any) {
        login(defaultUser);
        router.push("/home");
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    };

    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading };
};
