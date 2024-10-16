import React, { useState } from "react";
import Edit from "./Edit";
import { useUser } from "@/context/AuthContext";
import { User } from "@/interfaces/User";
import { dontFollowUser, followUser } from "@/routes/interactions";
import { toast } from "sonner";

interface Props {
  data: User;
}

const Follow: React.FC<Props> = (props) => {
  const { id, follow } = props.data;
  const { user } = useUser();
  const isSameUser = user.id === id;
  const [followState, setFollowState] = useState(isSameUser ? true : follow);
  const [editing, setEditing] = useState(false);

  const handleFollow = async () => {
    try {
      setFollowState(!followState);
      if (!followState) {
        await followUser(user.id, id, user.username);
      } else {
        await dontFollowUser(user.id, id, user.username);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <button
        onClick={isSameUser ? () => setEditing(true) : handleFollow}
        className={`p-2 h-9 text-sm flex justify-center items-center outline-none ${
          followState ? "bg-white text-black border" : "bg-threads text-white"
        } rounded-lg w-full font-semibold active:scale-90 transition-all duration-300`}
      >
        {isSameUser ? "Editar perfil" : followState ? "Siguiendo" : "Seguir"}
      </button>

      <Edit open={editing} setOpen={setEditing} />
    </>
  );
};

export default Follow;
