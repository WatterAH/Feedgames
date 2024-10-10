import { FileX } from "lucide-react";

const Error = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-y-3 text-center px-2">
      <FileX className="w-16 h-16 text-gray-400" />
      <h2 className="font-raleway font-semibold text-gray-700 text-3xl">
        Oops!
      </h2>
      <p className="text-gray-500">No pudimos cargar el contenido.</p>
      <p className="text-gray-500">
        Revisa tu conexión o asegúrate de que el recurso aún esté disponible.
      </p>
    </div>
  );
};

export default Error;
