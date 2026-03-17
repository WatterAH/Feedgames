import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Ellipsis, Pencil, Share, Trash2 } from "lucide-react";
import { share, stopPropagation } from "@/lib/utils";
import { useUser } from "@/context/AuthContext";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { removePost } from "@/store/feedSlice";

interface Props {
  userId: string;
  postId: string;
  editCallback(): void;
}

const Options: React.FC<Props> = ({ userId, postId, editCallback }) => {
  const { user } = useUser();
  const sameUser = user.id == userId;
  const dispatch: AppDispatch = useDispatch();

  const handleRemove = () => dispatch(removePost(postId));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={stopPropagation}
        className="inline-flex w-full justify-center gap-x-1.5 rounded-full p-2 text-threads hover:bg-(--hover) transition-all duration-300 cursor-pointer active:scale-90 focus:outline-hidden focus:ring-0 focus-visible:outline-none"
      >
        <Ellipsis size={20} className="text-(--placeholder)" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => share("p", postId)}>
            Compartir
            <Share />
          </DropdownMenuItem>
          {sameUser && (
            <DropdownMenuItem onClick={editCallback}>
              Editar
              <Pencil />
            </DropdownMenuItem>
          )}
          {sameUser && (
            <DropdownMenuItem className="text-red-400" onClick={handleRemove}>
              Eliminar
              <Trash2 />
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Options;
