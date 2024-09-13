import { URL } from "../App";
import { Note } from "../interfaces/Post";

export const createNewNote = async (
  id_user: string,
  note: string
): Promise<Note> => {
  const body = { id_user, note };
  const res = await fetch(`${URL}/api/createNewNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const resData = await res.json();
  if (!res.ok) {
    const { message } = resData;
    throw new Error(message);
  }
  return resData;
};

export const getAllNotes = async (): Promise<Note[]> => {
  const res = await fetch(`${URL}/api/getAllNotes`);
  const resData = await res.json();
  if (!res.ok) {
    const { message } = resData;
    throw new Error(message);
  }
  return resData;
};
