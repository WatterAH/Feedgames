import React from "react";
import copy from "clipboard-copy";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

interface Props {
  id: string;
  content: string;
}

export const ShareButton = ({ shareData }: { shareData: Props }) => {
  const URL = "https://feedgames.vercel.app";

  const { id, content } = shareData;
  const link = `${URL}/${content}/${id}`;

  const share = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        url: link,
      });
    } else {
      await copy(link);
      toast.success("Enlace copiado al portapapeles", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <button className="active:scale-125 transition-transform" onClick={share}>
      <FontAwesomeIcon icon={faShareFromSquare} className="h-6 text-teal-500" />
    </button>
  );
};
