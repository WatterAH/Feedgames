import React, { useState } from "react";
import Response from "../Response";
import { MessageSquareQuote } from "lucide-react";
import { PostInterface } from "@/interfaces/Post";
import { stopPropagation } from "@/functions/utils";
import { useUser } from "@/context/AuthContext";
import { defaultUser } from "@/interfaces/User";
import { alerts } from "@/constants/alerts";
import DialogComponent from "@/components/Global/Dialog";

interface Props {
  data: PostInterface;
}

const ResponseButton: React.FC<Props> = ({ data }) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [cant, setCant] = useState(false);
  const alert = alerts.cantCreate;

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    stopPropagation(e);
    if (user.id !== defaultUser.id) {
      setOpen(true);
    } else {
      setCant(true);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="active:scale-75 transition-transform"
      >
        <MessageSquareQuote
          aria-hidden="true"
          className="h-5 w-5 text-cyan-500"
        />
      </button>
      <Response open={open} setOpen={setOpen} data={data} parentId={data.id} />
      <DialogComponent open={cant} setOpen={setCant} {...alert} />
    </>
  );
};

export default ResponseButton;
