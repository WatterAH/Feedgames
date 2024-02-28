import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorPage = () => {
  return (
    <div className="flex flex-col gap-y-7 mt-20 items-center justify-center">
      <header className="flex flex-col justify-center items-center gap-y-3">
        <h1 className="text-3xl">Ocurrio un error</h1>
        <p className="text-xl">Intenta más tarde</p>
      </header>
      <ExclamationTriangleIcon className="text-red-400 h-16 w-16" />
    </div>
  );
};
