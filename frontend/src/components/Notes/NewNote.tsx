import React, { useState } from "react";
import Input from "../Global/Input";
import Button from "../Global/Button";
import { createNewNote } from "../../Api/notes";
import { DialogPanel, DialogTitle } from "@headlessui/react";
import { useUser } from "../../context/AuthContext";
import { Note } from "../../interfaces/Post";
import { toast } from "sonner";
import Loader from "../Global/Loader";

interface Props {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NewNote: React.FC<Props> = ({ setNotes }) => {
  const { user } = useUser();
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = await createNewNote(user.id, note);
      setNotes((prevNotes) => [...prevNotes, data]);
    } catch (error: any) {
      const { message } = error;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogPanel
      transition
      className="w-full max-w-md rounded-xl bg-neutral-900 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
    >
      <DialogTitle as="h3" className="text-base/7 font-medium text-white">
        Comparte una nota...
      </DialogTitle>
      <div className="mt-3">
        <Input
          placeholder="Estoy jugando Valorant!"
          value={note}
          maxLength={35}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <p className="mt-2 text-sm/6 text-white/50">
        Será visible para todo el mundo y se eliminará una vez que tú lo
        decidas.
      </p>
      <div className="flex justify-center items-center relative mt-4">
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={!note || note.length > 35}
        >
          {loading ? <Loader /> : "Listo"}
        </Button>
      </div>
    </DialogPanel>
  );
};

export default NewNote;
