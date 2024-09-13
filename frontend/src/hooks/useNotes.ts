import { useEffect, useState } from "react";
import { Note } from "../interfaces/Post";
import { getAllNotes } from "../Api/notes";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getNotes = async () => {
    try {
      setLoading(true);
      const data = await getAllNotes();
      setNotes(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return { notes, setNotes, loading, error };
};
