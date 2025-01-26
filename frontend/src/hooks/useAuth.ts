import { useCallback, useEffect, useState } from "react";
import { useUser } from "@/context/AuthContext";
import { getExpirationDate } from "@/functions/date";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { defaultUser, User } from "@/interfaces/User";
import { allowedPath } from "@/functions/utils";
import { auth, checkAuth, createProfile } from "@/routes/profile";

export const useLogin = () => {
  const { login } = useUser();
  const [loading, setLoading] = useState(false);
  const [, setCookie] = useCookies();
  const router = useRouter();

  const submit = useCallback(
    async (username: string, password: string) => {
      try {
        setLoading(true);
        const data = await auth(username, password);
        const { user, token } = data;
        login(user);
        setCookie("token", token, {
          path: "/",
          expires: getExpirationDate(),
        });
        toast.success(`Iniciaste sesión como ${user.username}`);
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
    async (userdata: Partial<User>) => {
      try {
        setLoading(true);
        const data = await createProfile(userdata);
        const { user, token } = data;
        login(user);
        setCookie("token", token, {
          expires: getExpirationDate(),
        });
        toast.success(`Bienvenido ${user.username}`);
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
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      try {
        const data = await checkAuth(cookies.token);
        const { user } = data;
        login(user);
        return router.push(pathname);
      } catch (_error) {
        login(defaultUser);
        if (!allowedPath(pathname)) {
          return router.push("/home");
        }
        return router.push(pathname);
      } finally {
        setLoading(false);
      }
    };

    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading };
};
