import React from "react";
import Theme from "./Theme";
import Modal from "@/components/Global/Modal";
import { appareances } from "@/constants/themes";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Appareance: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Apariencia"
      full={false}
      size="md"
    >
      <div className="absolute top-0.5 left-3 text-text">
        <button onClick={() => setOpen(false)}>Cancelar</button>
      </div>
      <div
        className="grid grid-cols-4 gap-4 px-4 py-2"
        style={{ placeItems: "center" }}
      >
        {appareances.map((theme) => (
          <Theme key={theme.name} {...theme} />
        ))}
      </div>
    </Modal>
  );
};

export default Appareance;
