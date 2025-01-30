import React, { useEffect, useState } from "react";
import Actions from "./layout/Actions";
import Header from "./layout/Header";
import TextArea from "./TextArea";
import MatchInput from "./valorant/MatchInput";
import ImageInput from "./image/ImageInput";
import Modal from "../Global/Modal";
import Canvas from "./pixels/Canvas";
import Preview from "./layout/Preview";
import { toast } from "sonner";
import { useUser } from "@/context/AuthContext";
import { createPost } from "@/routes/post";
import { useGetMatches } from "@/hooks/useValorant";
import { ContentObject } from "@/interfaces/Post";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/store/userSlice";
import { addPost } from "@/store/feedSlice";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Create: React.FC<Props> = ({ open, setOpen }) => {
  const { user: userSession } = useUser();
  const { user } = useSelector((state: RootState) => state.user);
  const { matches } = useGetMatches(userSession.riotId?.puuid);
  const [text, setText] = useState("");
  const [content, setContent] = useState<ContentObject>(null);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser(userSession?.id));
    }
  }, [dispatch, userSession?.id, user]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user?.id) return;

    if (!text.trim() && !content) {
      return toast.error(
        "Tu post necesita un poco de vida. ¿Texto o imagen, tal vez?"
      );
    }

    setOpen(false);
    toast.promise(createPost(user.id, text, content, user.username), {
      loading: "Publicando...",
      success: (data) => {
        setText("");
        setContent(null);
        dispatch(addPost(data));
        return "Publicado con éxito";
      },
      error: (err) => err.message,
    });
  };

  return (
    <Modal open={open} setOpen={setOpen} title="Crear Post" size="xl">
      <Actions onClose={() => setOpen(false)} onSubmit={handleSubmit} />
      <div className="max-h-[80vh] px-2 md:px-5 overflow-y-auto">
        {user?.id && (
          <Header username={user?.username} pfp={user?.pfp}>
            <div>
              <TextArea
                text={text}
                setText={setText}
                setContent={setContent}
                placeholder={`¿Qué hay en tu mente ${user?.name}?`}
              />
              <Preview content={content} setContent={setContent} />
              <div className="flex gap-x-3">
                <ImageInput setContent={setContent} />
                <Canvas setContent={setContent} />
                <MatchInput matches={matches} setContent={setContent} />
              </div>
            </div>
          </Header>
        )}
      </div>
    </Modal>
  );
};

export default Create;
