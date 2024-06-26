import React, { useState } from "react";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
import { useUser } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../Api/auth";
import { useCookies } from "react-cookie";
import { getExpirationDate } from "../functions/date";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

interface Props {
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

export const BasicInfo: React.FC<Props> = ({ setContent }) => {
  const nav = useNavigate();
  const { login } = useUser();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [details, setDetails] = useState("");
  const [password, setPassword] = useState("");
  const [_cookies, setCookie] = useCookies();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      nav("/");
    } catch (error: any) {
      const { message } = error;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-y-3 mt-6" onSubmit={handleSubmit}>
      <section className="flex flex-row gap-3 w-full justify-center">
        <span className="flex flex-col w-full">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            placeholder="Nombre"
            type="text"
            value={name}
            maxLength={17}
            onChange={(e) => setName(e.target.value)}
          />
        </span>
        <span className="flex flex-col w-full">
          <Label htmlFor="username">Nombre de usuario</Label>
          <Input
            id="username"
            placeholder="Nombre de usuario"
            type="text"
            value={username}
            maxLength={16}
            onChange={(e) => setUserName(e.target.value)}
          />
        </span>
      </section>
      <span className="flex flex-col">
        <Label htmlFor="details">Descripción</Label>
        <Input
          id="details"
          placeholder="Hola, soy Sam y me gusta Minecraft."
          type="text"
          value={details}
          maxLength={50}
          onChange={(e) => setDetails(e.target.value)}
        />
      </span>
      <span className="relative flex flex-col">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          placeholder="myPa$$word10"
          type={`${passwordVisibility ? "text" : "password"}`}
          value={password}
          maxLength={20}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="absolute bottom-8 right-2 text-gray-400 active:scale-125 transition-transform"
          type="button"
          onClick={() => setPasswordVisibility(!passwordVisibility)}
        >
          {passwordVisibility ? (
            <EyeIcon className="h-6 sm:h-5 text-gray-400" />
          ) : (
            <EyeSlashIcon className="h-6 sm:h-5 text-gray-400" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setContent("Login")}
          className="font-montserrat mt-2 text-xs text-gray-400"
        >
          Ya tienes cuenta?
        </button>
      </span>
      <span className="flex justify-center relative mt-3">
        <Button
          type="submit"
          disabled={!username || !name || !password ? true : false}
        >
          {loading ? "" : "Continuar"}
        </Button>
        {loading ? <Loading /> : ""}
      </span>
    </form>
  );
};
