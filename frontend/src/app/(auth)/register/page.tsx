"use client";
import Header from "@/components/Auth/Header";
import Button from "@/components/Global/Button";
import Input from "@/components/Global/Input";
import Label from "@/components/Global/Label";
import Link from "next/link";
import Loader from "@/components/Global/Loader";
import { useRegister } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Toaster } from "sonner";
import Footer from "@/components/Auth/Footer";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [details, setDetails] = useState("");
  const [password, setPassword] = useState("");
  const [viewPass, setViewPass] = useState(false);
  const { submit, loading } = useRegister();
  const PasswordIcon = viewPass ? Eye : EyeOff;
  const toggleViewPass = () => setViewPass(!viewPass);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(name, username, details, password);
  };

  return (
    <>
      <main className="flex flex-1 min-h-full flex-col justify-center h-screen px-6 py-12 sm:bg-gray-100">
        <div className="flex flex-col items-center shadow-transparent justify-center bg-white sm:shadow-md rounded-xl sm:mx-auto sm:max-w-md sm:w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-5 sm:mx-auto w-full sm:max-w-lg px-2 sm:px-9 py-4 sm:py-12"
          >
            <Header />
            <section id="names" className="flex space-x-3">
              <div className="flex flex-col w-1/2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  id="username"
                  placeholder="Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </section>
            <div id="details" className="flex flex-col">
              <Label htmlFor="details">Descripción</Label>
              <Input
                id="details"
                placeholder="Hola, soy Sam y me gusta Minecraft"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
            <section id="password" className="flex flex-col">
              <div className="relative">
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
              </div>
            </section>
            <Link
              href={"/login"}
              className="font-raleway mt-2 text-xs text-center text-gray-400"
            >
              ¿Ya tienes cuenta?
            </Link>
            <div className="flex justify-center items-center relative">
              <Button type="submit" disabled={!password || !username}>
                {loading ? <Loader /> : "Continuar"}
              </Button>
            </div>
          </form>
          <Footer />
        </div>
      </main>
      <Toaster richColors position="top-center" />
    </>
  );
}
