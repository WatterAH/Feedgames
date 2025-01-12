import React, { useState } from "react";
import Modal from "../../Global/Modal";
import Actions from "@/components/New/layout/Actions";
import Preview from "./Preview";
import { toast } from "sonner";
import { useUser } from "@/context/AuthContext";
import { changeTheme } from "@/routes/profile";
import { previewThemes } from "@/constants/themes";
import { User } from "@/interfaces/User";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  data: User;
}

const SelectTheme: React.FC<Props> = ({ open, setOpen, data }) => {
  const { user } = useUser();
  const [theme, setTheme] = useState(data.theme);

  const handleSubmit = () => {
    toast.promise(changeTheme(user.id, theme), {
      loading: "Cambiando...",
      success: "Tema cambiado con éxito, la ventana se recargará",
      error: (err) => err.message,
    });

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Selecciona un tema"
      full={false}
    >
      <Actions onClose={() => setOpen(false)} onSubmit={handleSubmit} />
      <div className="flex flex-wrap p-3 gap-2 h-[60vh] overflow-y-auto">
        {previewThemes.map((preview) => (
          <Preview
            key={preview.value}
            current={theme}
            setTheme={setTheme}
            {...preview}
          />
        ))}
      </div>
    </Modal>
  );
};

export default SelectTheme;
