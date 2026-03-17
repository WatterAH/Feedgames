import React, { useState } from "react";
import Header from "../New/layout/Header";
import Content from "./Content";
import TextArea from "../New/TextArea";
import { PostInterface } from "@/interfaces/Post";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "@/store/actions";
import { toast } from "sonner";
import postRouter from "@/routes/post";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Check, X } from "lucide-react";
import { stopPropagation } from "@/lib/utils";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: PostInterface;
}

const Edit: React.FC<Props> = ({ open, setOpen, post }) => {
  const [text, setText] = useState(post.text);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    toast.promise(postRouter.update(post.id, { text }), {
      loading: "Editando...",
      success: () => {
        setOpen(false);
        dispatch(updatePost(post.id, text));
        return "Editado con éxito";
      },
      error: (err) => err.message,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onClick={stopPropagation}
        showCloseButton={false}
        className="sm:max-w-xl"
      >
        <DialogHeader className="border-b p-3">
          <div className="flex w-full text-(--text) items-center justify-between">
            <button
              onClick={() => setOpen(false)}
              className="rounded-full hover:bg-(--hover) p-2 transition-all duration-500"
            >
              <X />
            </button>
            <DialogTitle>Editar publicación</DialogTitle>
            <button
              onClick={handleSubmit}
              className="rounded-full hover:bg-(--hover) p-2 transition-all duration-500"
            >
              <Check />
            </button>
          </div>
        </DialogHeader>

        <div className="max-h-[80vh] px-2 md:px-5 pb-6 overflow-y-auto">
          {user?.id && (
            <Header username={user.username} pfp={user.pfp}>
              <div>
                <TextArea text={text} setText={setText} pasteImages={false} />
                <Content showText={false} post={post} />
              </div>
            </Header>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
