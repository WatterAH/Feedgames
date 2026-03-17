import React, { useState } from "react";
import Header from "../New/layout/Header";
import TextArea from "../New/TextArea";
import Preview from "../New/layout/Preview";
import ImageInput from "../New/image/ImageInput";
import Content from "./Content";
import { useUser } from "@/context/AuthContext";
import { ContentObject, PostInterface } from "@/interfaces/Post";
import { toast } from "sonner";
import postRouter from "@/routes/post";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Check, X } from "lucide-react";

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
    toast.promise(postRouter.create(user.id, text, content, parentId), {
      loading: "Publicando...",
      success: () => {
        return "Publicado";
      },
      error: (err) => err.message,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton={false} className="sm:max-w-xl">
        <DialogHeader className="border-b p-3">
          <div className="flex w-full text-(--text) items-center justify-between">
            <button
              onClick={() => setOpen(false)}
              className="rounded-full hover:bg-(--hover) p-2 transition-all duration-500"
            >
              <X />
            </button>
            <DialogTitle>Respondiendo a {userData.username}</DialogTitle>
            <button
              onClick={handleSubmit}
              className="rounded-full hover:bg-(--hover) p-2 transition-all duration-500"
            >
              <Check />
            </button>
          </div>
        </DialogHeader>
        <div className="max-h-[80vh] px-2 md:px-5 pb-6 overflow-y-auto">
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
      </DialogContent>
    </Dialog>
  );
};

export default Response;
