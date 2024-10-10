import React, { useState } from "react";
import Create from "./Create";
import { SquarePen } from "lucide-react";

const New = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed p-5 bg-white border shadow-md rounded-md bottom-16 right-3 lg:right-10 hidden lg:flex justify-center items-center outline-none active:scale-90 transition-all duration-300"
      >
        <SquarePen className="text-threads h-9 w-9" />
      </button>
      <Create open={open} setOpen={setOpen} />
    </>
  );
};

export default New;
