"use client";
import Footer from "@/layout/Auth/Footer";
import Header from "@/layout/Auth/Header";
import Button from "@/components/Global/Button";
import Link from "next/link";
import Loader from "@/components/Global/Loader";
import FormField from "@/layout/Auth/FormField";
import { useRegister } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAnimations } from "@/hooks/useAnimations";
import { animated } from "react-spring";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPass, setViewPass] = useState(false);
  const { submit, loading } = useRegister();
  const { fadeIn } = useAnimations();
  const PasswordIcon = viewPass ? Eye : EyeOff;
  const toggleViewPass = () => setViewPass(!viewPass);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit({ name, username, email, password });
  };

  const AnimatedDiv: React.FC<React.PropsWithChildren<any>> = animated.div;

  return (
    <main className="flex flex-1 min-h-full flex-col justify-center h-screen px-6 py-12 bg-[var(--foreground)] sm:bg-[var(--background)]">
      <AnimatedDiv
        style={fadeIn}
        className="flex flex-col items-center shadow-transparent justify-center bg-foreground sm:shadow-md rounded-xl sm:mx-auto sm:max-w-md sm:w-full sm:border border-border"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-3 sm:mx-auto w-full sm:max-w-lg px-2 sm:px-9 py-4 sm:py-12"
        >
          <Header />
          <section id="names" className="flex space-x-3">
            <div className="w-1/2">
              <FormField
                id="name"
                value={name}
                label="Nombre"
                onChange={setName}
              />
            </div>
            <div className="w-1/2">
              <FormField
                id="username"
                value={username}
                label="Nombre de usuario"
                onChange={setUsername}
              />
            </div>
          </section>

          <FormField
            id="email"
            value={email}
            label="Correo electrónico"
            onChange={setEmail}
          />

          <div className="relative">
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
          </div>

          <Link
            href="/login"
            className="font-raleway mt-2 text-xs text-center text-gray-400"
          >
            ¿Ya tienes cuenta?
          </Link>

          <div className="flex justify-center items-center relative">
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
