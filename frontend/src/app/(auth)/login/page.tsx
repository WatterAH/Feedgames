"use client";
import Footer from "@/layout/Auth/Footer";
import Header from "@/layout/Auth/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLogin } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { animated } from "react-spring";
import { useAnimations } from "@/hooks/useAnimations";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { resetAll } from "@/store/actions";
import FormField from "@/layout/Auth/FormField";
import SubmitButton from "@/layout/Auth/SubmitButton";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [viewPass, setViewPass] = useState(false);
  const { submit, loading } = useLogin();
  const dispatch: AppDispatch = useDispatch();

  const PasswordIcon = viewPass ? Eye : EyeOff;
  const toggleViewPass = () => setViewPass(!viewPass);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(username, password);
  };

  useEffect(() => {
    dispatch(resetAll());
  }, [dispatch]);

  const { fadeIn } = useAnimations();
  const AnimatedDiv: React.FC<React.PropsWithChildren<any>> = animated.div;

  return (
    <main className="flex flex-1 min-h-full flex-col justify-center h-screen px-6 py-12 bg-[var(--foreground)] sm:bg-[var(--background)]">
      <AnimatedDiv
        style={fadeIn}
        className="flex flex-col items-center shadow-transparent justify-center bg-foreground sm:shadow-md rounded-xl sm:mx-auto sm:max-w-sm sm:w-full sm:border border-border"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-5 sm:mx-auto w-full sm:max-w-sm px-2 sm:px-9 py-4 sm:py-12"
        >
          <Header />
          <FormField
            id="username"
            value={username}
            label="Nombre de usuario"
            onChange={setUsername}
          />

          <div className="relative text-end">
            <FormField
              id="password"
              value={password}
              label="Contraseña"
              onChange={setPassword}
              type={viewPass ? "text" : "password"}
            />
            <button
              className="absolute top-[1.70rem] right-2 text-gray-400 active:scale-125 transition-transform"
              type="button"
              onClick={toggleViewPass}
            >
              <PasswordIcon className="h-6 sm:h-5 text-gray-400" />
            </button>
            <Link
              href="/recover-password"
              className="font-raleway mt-2 text-xs text-gray-400"
            >
              Olvidé mi contraseña
            </Link>
          </div>

          <Link
            href="/register"
            className="font-raleway mt-2 text-xs text-center text-gray-400"
          >
            ¿No tienes cuenta?
          </Link>

          <SubmitButton
            loading={loading}
            text="Continuar"
            disabled={!username || !password}
          />
        </form>
        <Footer />
      </AnimatedDiv>
    </main>
  );
}
