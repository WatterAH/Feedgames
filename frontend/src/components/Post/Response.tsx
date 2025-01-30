import React, { useState } from "react";
import Modal from "../Global/Modal";
import Actions from "../New/layout/Actions";
import Header from "../New/layout/Header";
import TextArea from "../New/TextArea";
import Preview from "../New/layout/Preview";
import ImageInput from "../New/image/ImageInput";
import Content from "./Content";
import { useUser } from "@/context/AuthContext";
import { ContentObject, PostInterface } from "@/interfaces/Post";
import { toast } from "sonner";
import { createPost } from "@/routes/post";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: PostInterface;
  parentId: string;
}

const Response: React.FC<Props> = ({ open, setOpen, data, parentId }) => {
  const { user } = useUser();
  const { user: userData } = data;
  const [text, setText] = useState("");
  const [content, setContent] = useState<ContentObject>(null);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(false);
    toast.promise(createPost(user.id, text, content, user.username, parentId), {
      loading: "Publicando...",
      success: () => {
        return "Publicado";
      },
      error: (err) => err.message,
    });
  };

  return (
    <Modal open={open} setOpen={setOpen} title="Respondiendo">
      <Actions onClose={() => setOpen(false)} onSubmit={handleSubmit} />
      <div className="max-h-[80vh] px-2 md:px-5 overflow-y-auto">
        <div className="mb-3 space-y-2">
          <Header username={user.username} pfp={user.pfp}>
            <div>
              <TextArea
                text={text}
                setText={setText}
                setContent={setContent}
                placeholder={`Responde a ${userData.username}`}
              />
              <Preview content={content} setContent={setContent} />
              <ImageInput setContent={setContent} />
            </div>
          </Header>
        </div>
        <div className="pr-5">
          <Header username={userData.username} pfp={userData.pfp}>
            <Content post={data} />
          </Header>
        </div>
      </div>
    </Modal>
  );
};

export default Response;
