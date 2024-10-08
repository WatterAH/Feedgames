import { useCallback, useEffect, useState } from "react";
import { checkAuth, loginApi, registerApi } from "@/routes/auth";
import { useUser } from "@/context/AuthContext";
import { getExpirationDate } from "@/functions/date";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { setRiotId } from "@/routes/valorant";

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
      router.push("/login");
      return;
    }

    const check = async () => {
      try {
        const data = await checkAuth(cookies.token);
        const { user } = data;
        login(user);
      } catch (error: any) {
        router.push("/login");
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

export const useRiotToken = () => {
  const { login, user } = useUser();
  const searchParams = useSearchParams();
  const riotToken = searchParams.get("riotToken");
  const [, setCookie] = useCookies();

  useEffect(() => {
    if (riotToken && user.id) {
      const setData = async () => {
        toast.promise(setRiotId(riotToken, user.id), {
          loading: "Vinculando...",
          success: (data) => {
            login(data.user);
            setCookie("token", data.token, {
              expires: getExpirationDate(),
            });
            return "Cuenta de Riot vinculada con éxito.";
          },
          error: (err) => err.message,
        });
      };
      setData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [riotToken, user.id]);
};
