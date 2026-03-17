import React from "react";
import Preview from "./Preview";
import { previewThemes, Theme } from "@/constants/themes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  theme: Theme;
  setTheme: (value: Theme) => void;
}

const SelectTheme: React.FC<Props> = ({ open, setOpen, theme, setTheme }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton={false}>
        <DialogHeader className="border-b flex items-center py-4">
          <DialogTitle>Selecciona un tema</DialogTitle>
          <button
            onClick={() => setOpen(false)}
            className="absolute right-2 top-1 hover:bg-(--hover) rounded-full p-2"
          >
            <X />
          </button>
        </DialogHeader>
        <div className="flex flex-wrap p-3 gap-2 h-[60vh] overflow-y-auto">
          {previewThemes.map((preview) => (
            <Preview
              key={preview.value}
              current={theme}
              setOpen={setOpen}
              setTheme={setTheme}
              {...preview}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectTheme;
