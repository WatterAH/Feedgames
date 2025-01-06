import React, { useState } from "react";
import Actions from "./layout/Actions";
import Header from "./layout/Header";
import TextArea from "./TextArea";
import MatchInput from "./valorant/MatchInput";
import ImageInput from "./image/ImageInput";
import Modal from "../Global/Modal";
import Preview from "./layout/Preview";
import { toast } from "sonner";
import { useUser } from "@/context/AuthContext";
import { createPost } from "@/routes/post";
import { MatchShowCase } from "@/interfaces/Valorant";
import { useGetMatches } from "@/hooks/useValorant";
import { PixelArtProps } from "@/interfaces/Post";
import Canvas from "./pixels/Canvas";

export type ContentInterface =
  | { type: "image"; data: File }
  | { type: "valorant"; data: MatchShowCase }
  | { type: "pixelart"; data: PixelArtProps }
  | { type: "textonly"; data: null };

export type ContentObject = ContentInterface | null;

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Create: React.FC<Props> = ({ open, setOpen }) => {
  const { user } = useUser();
  const { matches } = useGetMatches(user.riotId?.puuid);
  const [text, setText] = useState("");
  const [content, setContent] = useState<ContentObject>(null);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!text.trim() && !content) {
      const error =
        "Tu post necesita un poco de vida. ¿Texto o imagen, tal vez?";
      toast.error(error);
    } else {
      setOpen(false);
      toast.promise(createPost(user.id, text, content), {
        loading: "Publicando...",
        success: () => {
          setText("");
          setContent(null);
          return "Publicado con éxito";
        },
        error: (err) => err.message,
      });
    }
  };

  return (
    <Modal open={open} setOpen={setOpen} title="Crear Post" size="xl">
      <Actions onClose={() => setOpen(false)} onSubmit={handleSubmit} />
      <div className="max-h-[80vh] px-2 md:px-5 overflow-y-auto">
        <Header username={user.username} pfp={user.pfp}>
          <div>
            <TextArea
              text={text}
              setText={setText}
              setContent={setContent}
              placeholder={`¿Qué hay en tu mente ${user.name}?`}
            />
            <Preview content={content} setContent={setContent} />
            <div className="flex gap-x-2">
              <ImageInput setContent={setContent} />
              <Canvas setContent={setContent} />
              <MatchInput
                matches={matches}
                riotId={user.riotId}
                setContent={setContent}
              />
            </div>
          </div>
        </Header>
      </div>
    </Modal>
  );
};

export default Create;
