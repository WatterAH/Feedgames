import React, { useEffect, useState } from "react";
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

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Create: React.FC<Props> = ({ open, setOpen }) => {
  const { user } = useUser();
  const { matches } = useGetMatches(user.riotId?.puuid);
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [valMatch, setValMatch] = useState<MatchShowCase | null>(null);
  const [preview, setPreview] = useState<string | MatchShowCase | null>(null);

  useEffect(() => {
    if (preview == null) {
      setImage(null);
      setValMatch(null);
    }
  }, [preview]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(false);
    toast.promise(createPost(user.id, text, image, valMatch), {
      loading: "Publicando...",
      success: () => {
        setText("");
        setImage(null);
        setValMatch(null);
        setPreview(null);
        return "Publicado con éxito";
      },
      error: (err) => err.message,
    });
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
              setPreview={setPreview}
              setImage={setImage}
              placeholder={`¿Qué hay en tu mente ${user.name}?`}
            />
            <Preview preview={preview} setPreview={setPreview} />
            <div className="flex gap-x-2">
              <ImageInput setImage={setImage} setPreview={setPreview} />
              <MatchInput
                matches={matches}
                riotId={user.riotId}
                setValMatch={setValMatch}
                setPreview={setPreview}
              />
            </div>
          </div>
        </Header>
      </div>
    </Modal>
  );
};

export default Create;
