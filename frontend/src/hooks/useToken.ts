"use client";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useUser } from "@/context/AuthContext";
import { checkAuth } from "@/routes/auth";
import { useRouter } from "next/navigation";

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
