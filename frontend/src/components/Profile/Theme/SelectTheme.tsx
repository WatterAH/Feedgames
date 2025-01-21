import React, { useState } from "react";
import Modal from "../../Global/Modal";
import Actions from "@/components/New/layout/Actions";
import Preview from "./Preview";
import { useUser } from "@/context/AuthContext";
import { previewThemes } from "@/constants/themes";
import { User } from "@/interfaces/User";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { updateTheme } from "@/store/userSlice";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  data: User;
}

const SelectTheme: React.FC<Props> = ({ open, setOpen, data }) => {
  const { user } = useUser();
  const [theme, setTheme] = useState(data.theme);
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(updateTheme(user.id, theme));
    setOpen(false);
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
