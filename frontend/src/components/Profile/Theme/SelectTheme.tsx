import React from "react";
import Modal from "../../Global/Modal";
import Preview from "./Preview";
import { previewThemes, Theme } from "@/constants/themes";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  theme: Theme;
  setTheme: (value: Theme) => void;
}

const SelectTheme: React.FC<Props> = ({ open, setOpen, theme, setTheme }) => {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Selecciona un tema"
      full={false}
    >
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
    </Modal>
  );
};

export default SelectTheme;
