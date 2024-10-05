import React, { useState } from "react";
import New from "./New";
import { SquarePen } from "lucide-react";

const Create = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="absolute p-5 bg-white border shadow-md rounded-md bottom-16 right-3 lg:right-10 hidden lg:flex justify-center items-center"
      >
        <SquarePen className="text-threads h-9 w-9" />
      </button>
      <New open={open} setOpen={setOpen} />
    </>
  );
};

export default Create;
