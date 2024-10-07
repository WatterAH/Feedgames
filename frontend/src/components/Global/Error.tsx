import { CircleX } from "lucide-react";
import React from "react";

const Error = () => {
  return (
    <div className="h-full flex items-center justify-center flex-col gap-y-3">
      <h2 className="font-raleway text-3xl">Ocurrió un error</h2>
      <CircleX className="h-12 w-12 text-red-400" />
    </div>
  );
};

export default Error;
