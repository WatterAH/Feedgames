import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Loading } from "../components/Loading";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { Button } from "../components/Button";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye as faEyeRegular } from "@fortawesome/free-regular-svg-icons";
import { faEye as faEyeSolid } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../context/AuthContext";
import { loginApi } from "../Api/auth";
import { Header } from "./Header";

export const LoginForm = ({ setContent }) => {
  const { login } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userData = await loginApi(username, password);
      login(userData);
      nav("/");
    } catch (error) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sm:mx-auto w-full sm:max-w-sm px-2 sm:px-9 py-4 sm:py-12">
      <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
        <Header />
        <span className="flex flex-col">
          <Label htmlFor="username">Nombre de usuario</Label>
          <Input
            id="username"
            placeholder="Nombre de usuario"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </span>
        <span className="flex flex-col">
          <Label htmlFor="password">Contraseña</Label>
          <span className="relative">
            <Input
              id="password"
              placeholder="myPa$$word10"
              type={`${passwordVisibility ? "text" : "password"}`}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute bottom-2 right-2 text-gray-400 active:scale-125 transition-transform"
              type="button"
              onClick={() => setPasswordVisibility(!passwordVisibility)}
            >
              <FontAwesomeIcon
                icon={passwordVisibility ? faEyeSolid : faEyeRegular}
              />
            </button>
          </span>
          <button
            onClick={() => setContent("Register")}
            className="font-montserrat mt-2 text-xs text-gray-400"
            type="button"
          >
            ¿No tienes cuenta?
          </button>
        </span>
        <span className="flex justify-center relative">
          <Button type="submit" disabled={loading}>
            {loading ? "" : "Continuar"}
          </Button>
          {loading ? <Loading /> : ""}
        </span>
      </form>
      <ToastContainer />
    </section>
  );
};
