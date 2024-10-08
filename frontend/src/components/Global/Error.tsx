import React from "react";
import { FileX } from "lucide-react";

interface Props {
  item: string;
}

const Error: React.FC<Props> = ({ item }) => {
  return (
    <div className="h-full flex items-center justify-center flex-col gap-y-3 text-center px-2">
      <FileX className="w-16 h-16 text-gray-400" />
      <h2 className="font-raleway font-semibold text-gray-700 text-3xl">
        Oops! {item} no encontrado
      </h2>
      <p className="text-gray-500">
        No pudimos encontrar el {item} que estás buscando. Es posible que haya
        sido eliminado.
      </p>
    </div>
  );
};

export default Error;
