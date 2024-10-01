"use client";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useUser } from "@/context/AuthContext";
import { checkAuth } from "@/api/auth";
import { useRouter } from "next/navigation";

export const useToken = () => {
  const { login } = useUser();
  const [cookies] = useCookies();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const check = async () => {
    try {
      const data = await checkAuth(cookies.token, "");
      const { user } = data;
      login(user);
    } catch (error) {
      router.push("/auth/signin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    check();
  }, [cookies.token]);

  return { loading };
};
