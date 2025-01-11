import React from "react";
import Modal from "../../Global/Modal";
import Preview from "./Preview";
import { previewThemes, Theme } from "@/constants/themes";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  current: Theme;
  setTheme: (theme: Theme) => void;
}

const SelectTheme: React.FC<Props> = ({ open, setOpen, current, setTheme }) => {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Selecciona un tema"
      full={false}
    >
      <div className="absolute px-3 md:px-2 flex w-full text-threads justify-between -top-1 left-0">
        <button
          className="rounded-full hover:bg-gray-100 hover:cursor-pointer p-2 transition-all duration-500"
          onClick={() => setOpen(false)}
        >
          <X />
        </button>
      </div>
      <div className="flex flex-wrap p-3 gap-2">
        <Preview
          current={current}
          setTheme={setTheme}
          src="white"
          theme="default"
          value="default"
        />
        {previewThemes.map((preview) => (
          <Preview
            key={preview.value}
            setTheme={setTheme}
            current={current}
            {...preview}
          />
        ))}
      </div>
    </Modal>
  );
};

export default SelectTheme;
