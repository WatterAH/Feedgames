import React from "react";
import Theme from "./Theme";
import { appareances } from "@/constants/themes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Appareance: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton={false}>
        <DialogHeader className="border-b py-4 flex items-center">
          <DialogTitle>Tema</DialogTitle>
          <button
            onClick={() => setOpen(false)}
            className="absolute right-2 top-1 hover:bg-(--hover) rounded-full p-2"
          >
            <X />
          </button>
        </DialogHeader>
        <div
          className="grid grid-cols-4 gap-4 px-4 pt-2 pb-6"
          style={{ placeItems: "center" }}
        >
          {appareances.map((theme) => (
            <Theme key={theme.name} {...theme} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Appareance;
