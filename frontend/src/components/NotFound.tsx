import React from "react";

interface Props {
  title: string;
}

export const NotFound: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex gap-y-3 items-center justify-center flex-col h-screen">
      <p className="text-4xl font-rubik">404</p>
      <h1 className="text-3xl font-montserrat text-center">
        Este {title} no existe
      </h1>
      <p className="font-montserrat text-center">
        Es posible que hayas seguido un enlace incorrecto o que el {title} se
        haya eliminado.
      </p>
    </div>
  );
};
