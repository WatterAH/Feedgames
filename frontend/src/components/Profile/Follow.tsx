import React, { useState } from "react";
import Edit from "./Edit/Edit";
import { useUser } from "@/context/AuthContext";
import { defaultUser, User } from "@/interfaces/User";
import { unFollowUser, followUser } from "@/routes/interactions";
import { toast } from "sonner";
import { stopPropagation } from "@/functions/utils";
import { alerts } from "@/constants/alerts";
import DialogComponent from "../Global/Dialog";

interface Props {
  data: User;
}

const Follow: React.FC<Props> = (props) => {
  const { id, follow } = props.data;
  const { user } = useUser();
  const isSameUser = user.id === id;
  const [followState, setFollowState] = useState(isSameUser ? true : follow);
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const alert = alerts.cantFollow;

  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    stopPropagation(e);
    if (user.id !== defaultUser.id) {
      try {
        setFollowState(!followState);
        if (!followState) {
          await followUser(user.id, id, user.username);
        } else {
          await unFollowUser(user.id, id, user.username);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={isSameUser ? () => setEditing(true) : handleFollow}
        className={`p-2 h-9 text-sm flex justify-center items-center outline-none ${
          followState
            ? "bg-white dark:bg-threads dark:border-outline dark:text-white text-black border"
            : "bg-threads dark:bg-white dark:text-black text-white"
        } rounded-xl w-full font-semibold active:scale-90 transition-all duration-300`}
      >
        {isSameUser ? "Editar perfil" : followState ? "Siguiendo" : "Seguir"}
      </button>

      <Edit open={editing} setOpen={setEditing} />
      <DialogComponent open={open} setOpen={setOpen} {...alert} />
    </>
  );
};

export default Follow;
