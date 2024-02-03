import React from "react";
import { URL } from "../../App";
import { toast } from "react-toastify";
import { CommentInterface } from "../../interfaces/Comment";

interface Props {
  id_comment: string;
  setResponses: React.Dispatch<React.SetStateAction<CommentInterface[]>>;
}

export const ShowResponses: React.FC<Props> = ({
  id_comment,
  setResponses,
}) => {
  const handleClick = async () => {
    try {
      const res = await fetch(
        `${URL}/api/getResponsesById?id=${encodeURIComponent(id_comment)}`
      );
      const resData = await res.json();
      if (!res.ok) {
        toast.error(resData.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        setResponses(resData);
      }
    } catch (error) {
      toast.error("Ocurrio un error", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <button
      className="text-gray-400 text-sm font-montserrat mb-6"
      onClick={handleClick}
    >
      Cargar respuestas
    </button>
  );
};
