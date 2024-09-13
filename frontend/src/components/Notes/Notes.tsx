import Note from "./Note";
import { useUser } from "../../context/AuthContext";
import Modal from "../Global/Modal";
import NewNote from "./NewNote";
import { useNotes } from "../../hooks/useNotes";
import { Note as NoteInterface } from "../../interfaces/Post";

const Notes = () => {
  const { user } = useUser();
  const { notes, setNotes } = useNotes();

  const CreateButton: NoteInterface = {
    created_at: "",
    id: "1",
    id_user: user.id,
    note: "Añade una nota...",
    user: {
      pfp: user.pfp,
      username: user.username,
    },
  };

  return (
    <div className="overflow-x-auto p-3 border-b flex flex-row items-start gap-x-2">
      <Modal component={<NewNote setNotes={setNotes} />}>
        <Note data={CreateButton} />
      </Modal>
      {notes.map((note) => (
        <Note data={note} key={note.id} />
      ))}
    </div>
  );
};

export default Notes;
