"use client";
import Footer from "@/layout/Auth/Footer";
import FormField from "@/layout/Auth/FormField";
import Header from "@/layout/Auth/Header";
import SubmitButton from "@/layout/Auth/SubmitButton";
import { toast } from "sonner";
import { useState } from "react";
import { animated } from "react-spring";
import { useRouter, useSearchParams } from "next/navigation";
import { useAnimations } from "@/hooks/useAnimations";
import { getToken, resetPassword } from "@/routes/profile";

export default function RecoverPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const AnimatedDiv: React.FC<React.PropsWithChildren<any>> = animated.div;
  const { fadeIn } = useAnimations();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (token) {
      toast.promise(resetPassword(password, token), {
        loading: "Actualizando...",
        success: () => {
          router.push("/login");
          return "Contraseña actualizada con éxito";
        },
        error: (err) => err.message,
        finally: () => setLoading(false),
      });
    } else {
      toast.promise(getToken(email), {
        loading: "Enviando...",
        success: "Se te enviará un correo electronico",
        finally: () => setLoading(false),
      });
    }
  };

  return (
    <main className="flex flex-1 min-h-full flex-col justify-center h-screen px-6 py-12 bg-[var(--foreground)] sm:bg-[var(--background)]">
      <AnimatedDiv
        style={fadeIn}
        className="flex flex-col items-center shadow-transparent justify-center bg-foreground sm:shadow-md rounded-xl sm:mx-auto sm:max-w-sm sm:w-full sm:border border-border"
      >
        <form
          className="flex flex-col gap-y-5 sm:mx-auto w-full sm:max-w-sm px-2 sm:px-9 py-4 sm:py-12"
          onSubmit={handleSubmit}
        >
          <Header />
          {token ? (
            <>
              <FormField
                id="password"
                label="Nueva contraseña"
                value={password}
                onChange={setPassword}
              />
              <p className="text-text text-xs text-center font-raleway">
                Por razones de seguridad (y para evitar que tu gato entre a tu
                cuenta), asegurate de elegir una contraseña segura. ¿Listo para
                volver al juego?
              </p>
            </>
          ) : (
            <>
              <FormField
                id="email"
                value={email}
                onChange={setEmail}
                label="Correo electronico"
              />
              <p className="text-text text-xs text-center font-raleway">
                Si creaste tu cuenta antes del 25 de enero de 2025, debes
                contactar con soporte técnico para la inserción manual de su
                correo electrónico.
              </p>
            </>
          )}
          <SubmitButton
            loading={loading}
            disabled={token ? !password : !email}
            text="Continuar"
          />
          <Footer />
        </form>
      </AnimatedDiv>
    </main>
  );
}
