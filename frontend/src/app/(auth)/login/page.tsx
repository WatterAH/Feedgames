"use client";
import Input from "@/components/Global/Input";
import Button from "@/components/Global/Button";
import Label from "@/components/Global/Label";
import Loader from "@/components/Global/Loader";
import Footer from "@/layout/Auth/Footer";
import Header from "@/layout/Auth/Header";
import Link from "next/link";
import { useState } from "react";
import { useLogin } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { animated } from "react-spring";
import { useAnimations } from "@/hooks/useAnimations";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [viewPass, setViewPass] = useState(false);
  const { fadeIn } = useAnimations();
  const { submit, loading } = useLogin();
  const PasswordIcon = viewPass ? Eye : EyeOff;
  const toggleViewPass = () => setViewPass(!viewPass);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(username, password);
  };

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
          <div id="usernameContainer" className="flex flex-col">
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input
              id="username"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>
          <div id="passwordContainer" className="flex flex-col">
            <span className="relative">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={`${viewPass ? "text" : "password"}`}
              />
              <button
                className="absolute bottom-2 right-2 text-gray-400 active:scale-125 transition-transform"
                type="button"
                onClick={toggleViewPass}
              >
                <PasswordIcon className="h-6 sm:h-5 text-gray-400" />
              </button>
            </span>
          </div>
          <Link
            href={"/register"}
            className="font-raleway mt-2 text-xs text-center text-gray-400"
          >
            ¿No tienes cuenta?
          </Link>
          <div
            id="submitContainer"
            className="flex justify-center items-center relative"
          >
            <Button type="submit" disabled={!password || !username}>
              {loading ? <Loader size="small" color="white" /> : "Continuar"}
            </Button>
          </div>
        </form>
        <Footer />
      </AnimatedDiv>
    </main>
  );
}
