import React, { useState } from "react";
import FormField from "./FormField";
import ImageInput from "./ImageInput";
import { handleImageChange } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/store/userSlice";
import { defaultUser, User } from "@/interfaces/User";
import ThemeInput from "./ThemeInput";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, X } from "lucide-react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Edit: React.FC<Props> = ({ open, setOpen }) => {
  const data =
    useSelector((state: RootState) => state.user.user) || defaultUser;
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton={false}>
        <DialogHeader className="border-b flex items-center py-1 px-3 w-full">
          <div className="flex w-full text-(--text) items-center justify-between">
            <button
              onClick={() => setOpen(false)}
              className="rounded-full hover:bg-(--hover) p-2 transition-all duration-500"
            >
              <X />
            </button>
            <DialogTitle>Editar perfil</DialogTitle>
            <button
              onClick={handleSubmit}
              className="rounded-full hover:bg-(--hover) p-2 transition-all duration-500"
            >
              <Check />
            </button>
          </div>
        </DialogHeader>
        <div className="w-full px-3 pb-6 flex flex-col items-center gap-y-3">
          <div className="flex items-center justify-around w-full">
            <ImageInput
              handleImage={(e) => handleImageChange(e, handleImage)}
              picture={picture}
            />
            <ThemeInput theme={theme} setTheme={setTheme} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
            <FormField label="Nombre" value={name} onChange={setName} />
            <FormField
              label="Usuario"
              value={username}
              onChange={setUsername}
            />
          </div>
          <FormField label="Bio" value={bio} onChange={setBio} />
          <FormField label="Correo" value={email ?? ""} onChange={setEmail} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
