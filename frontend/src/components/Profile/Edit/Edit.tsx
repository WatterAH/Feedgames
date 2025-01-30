import React, { useState } from "react";
import Modal from "@/components/Global/Modal";
import FormField from "./FormField";
import Actions from "@/components/New/layout/Actions";
import ImageInput from "./ImageInput";
import { handleImageChange } from "@/functions/utils";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { updateUser } from "@/store/userSlice";
import { User } from "@/interfaces/User";
import ThemeInput from "./ThemeInput";

interface Props {
  data: User;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Edit: React.FC<Props> = ({ open, setOpen, data }) => {
  const src = data.pfp
    ? process.env.NEXT_PUBLIC_IMAGES + data.pfp
    : "/default.png";

  const [picture, setPicture] = useState(src);
  const [name, setName] = useState(data.name);
  const [image, setImage] = useState<File | null>(null);
  const [email, setEmail] = useState(data.email);
  const [bio, setBio] = useState(data.bio);
  const [theme, setTheme] = useState(data.theme);
  const [username, setUsername] = useState(data.username);

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(false);
    dispatch(updateUser(data.id, { name, username, bio, theme }, image));
  };

  const handleImage = (file: File, readerResult?: string) => {
    setImage(file);
    if (readerResult) setPicture(readerResult);
  };

  return (
    <Modal size="md" open={open} setOpen={setOpen} title="Modo de edición">
      <Actions onClose={() => setOpen(false)} onSubmit={handleSubmit} />
      <div className="w-full px-3 pb-3 flex flex-col items-center gap-y-3">
        <div className="flex items-center justify-around w-full">
          <ImageInput
            handleImage={(e) => handleImageChange(e, handleImage)}
            picture={picture}
          />
          <ThemeInput theme={theme} setTheme={setTheme} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
          <FormField label="Nombre" value={name} onChange={setName} />
          <FormField label="Usuario" value={username} onChange={setUsername} />
        </div>
        <FormField label="Bio" value={bio} onChange={setBio} />
        <FormField label="Correo" value={email} onChange={setEmail} />
      </div>
    </Modal>
  );
};

export default Edit;
