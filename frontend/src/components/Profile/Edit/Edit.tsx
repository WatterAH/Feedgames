import React, { useState } from "react";
import Modal from "@/components/Global/Modal";
import Header from "./Header";
import FormField from "./FormField";
import Actions from "@/components/New/layout/Actions";
import { toast } from "sonner";
import { useUser } from "@/context/AuthContext";
import { isImage } from "@/functions/utils";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { updateUser } from "@/store/userSlice";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Edit: React.FC<Props> = ({ open, setOpen }) => {
  const { user } = useUser();

  const src = user.pfp
    ? process.env.NEXT_PUBLIC_IMAGES + user.pfp
    : "/default.png";

  const [picture, setPicture] = useState(src);
  const [image, setImage] = useState<File | null>(null);
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [details, setDetails] = useState(user.details);

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(false);
    dispatch(updateUser(user.id, name, username, details, image));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (!isImage(file)) return toast.warning("Solo se permiten imágenes");

    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPicture(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Modal size="md" open={open} setOpen={setOpen} title="Modo de edición">
      <Actions onClose={() => setOpen(false)} onSubmit={handleSubmit} />
      <div className="w-full px-3 pb-3 flex flex-col items-center gap-y-2">
        <label
          htmlFor="img"
          className="text-text font-medium flex flex-col items-center gap-y-2 hover:cursor-pointer"
        >
          <Header picture={picture} />
          Cambiar foto
        </label>
        <input
          id="img"
          onChange={handleImageChange}
          type="file"
          accept=".png, .jpeg, .jpg, .gif, .webp"
          className="hidden"
        />
        <FormField label="Usuario" value={username} onChange={setUsername} />
        <FormField label="Nombre" value={name} onChange={setName} />
        <FormField label="Descripción" value={details} onChange={setDetails} />
      </div>
    </Modal>
  );
};

export default Edit;
