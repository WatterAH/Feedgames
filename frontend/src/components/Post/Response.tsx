import React, { useState } from "react";
import Modal from "../Global/Modal";
import Actions from "../New/layout/Actions";
import Header from "../New/layout/Header";
import TextArea from "../New/TextArea";
import Preview from "../New/layout/Preview";
import ImageInput from "../New/image/ImageInput";
import Content from "./Content";
import { useUser } from "@/context/AuthContext";
import { MatchShowCase } from "@/interfaces/Valorant";
import { PostInterface } from "@/interfaces/Post";
import { toast } from "sonner";
import { response } from "@/routes/response";
import { CommentInterface } from "@/interfaces/Comment";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: PostInterface | CommentInterface;
  parentId: string | null;
}

const Response: React.FC<Props> = ({ open, setOpen, data, parentId }) => {
  const {
    user: { id, username, pfp },
  } = useUser();
  const { user: userData } = data;
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | MatchShowCase | null>(null);

  const isPost = (
    data: PostInterface | CommentInterface
  ): data is PostInterface => {
    return (data as PostInterface).valMatch !== undefined;
  };
  const postId = isPost(data) ? data.id : data.id_post;

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(false);
    toast.promise(
      response(id, postId, parentId, text, image, userData.id, username),
      {
        loading: "Publicando...",
        success: () => {
          return "Publicado";
        },
        error: (err) => err.message,
      }
    );
  };

  return (
    <Modal open={open} setOpen={setOpen} title="Respondiendo">
      <Actions onClose={() => setOpen(false)} onSubmit={handleSubmit} />
      <div className="max-h-[80vh] px-2 md:px-5 overflow-y-auto">
        <div className="mb-3 space-y-2">
          <Header username={username} pfp={pfp}>
            <div>
              <TextArea
                text={text}
                setText={setText}
                setPreview={setPreview}
                setImage={setImage}
                placeholder={`Responde a ${userData.username}`}
              />
              <Preview preview={preview} setPreview={setPreview} />
              <ImageInput setImage={setImage} setPreview={setPreview} />
            </div>
          </Header>
        </div>
        <div className="pr-5">
          <Header username={userData.username} pfp={userData.pfp}>
            <Content data={data} />
          </Header>
        </div>
      </div>
    </Modal>
  );
};

export default Response;
