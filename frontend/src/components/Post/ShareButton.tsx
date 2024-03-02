import React from "react";

import { ToastContainer, toast } from "react-toastify";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface Props {
  id: string;
  content: string;
}

export const ShareButton = ({ shareData }: { shareData: Props }) => {
  const URL = "https://feedgames.vercel.app";

  const { id, content } = shareData;
  const link = `${URL}/${content}/${id}`;

  return (
    <>
      <button className="active:scale-125 transition-transform">
        <ArrowTopRightOnSquareIcon
          aria-hidden="true"
          className="h-6 text-gray-600"
        />
      </button>
      <ToastContainer />
    </>
  );
};
