import React from "react";
import copy from "clipboard-copy";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

export const ShareButton = ({ content, data }) => {
  const URL = "https://craftfeed.vercel.app";

  const { id, title } = data;
  const text =
    content == "Post"
      ? "¡Mira este post en CraftFeed!"
      : "¡Mira este Perfil en CraftFeed!";

  const share = async () => {
    let link = `${URL}?content=${content}&id=${id}`;
    if (navigator.share) {
      navigator.share({
        title: title,
        text,
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
      <FontAwesomeIcon
        icon={faShareFromSquare}
        className="h-6 text-stone-500"
      />
    </button>
  );
};
