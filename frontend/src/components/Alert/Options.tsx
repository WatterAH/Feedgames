import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Ellipsis, Trash2 } from "lucide-react";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { removeAlert } from "@/store/activity";

interface Props {
  alertId: string;
}

const Options: React.FC<Props> = ({ alertId }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleRemove = () => dispatch(removeAlert(alertId));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex w-full justify-center gap-x-1.5 rounded-full p-2 text-threads hover:bg-(--hover) transition-all duration-300 cursor-pointer active:scale-90 focus:outline-hidden focus:ring-0 focus-visible:outline-none">
        <Ellipsis size={20} className="text-(--placeholder)" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleRemove} className="text-red-400">
            Eliminar
            <Trash2 />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Options;
