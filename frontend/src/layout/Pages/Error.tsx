import { FileX } from "lucide-react";

const Error = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-y-3 text-center px-2">
      <FileX className="w-16 h-16 text-placeholder" />
      <h2 className="font-raleway font-semibold text-text text-3xl">Oops!</h2>
      <p className="text-placeholder">No pudimos cargar el contenido.</p>
      <p className="text-placeholder">
        Revisa tu conexión o asegúrate de que el recurso aún esté disponible.
      </p>
    </div>
  );
};

export default Error;
