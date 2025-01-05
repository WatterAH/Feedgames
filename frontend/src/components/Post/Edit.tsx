import React, { useState } from "react";
import Modal from "../Global/Modal";
import Actions from "../New/layout/Actions";
import Header from "../New/layout/Header";
import Content from "./Content";
import TextArea from "../New/TextArea";
import { useUser } from "@/context/AuthContext";
import { stopPropagation } from "@/functions/utils";
import { PostInterface } from "@/interfaces/Post";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { editPostById } from "@/routes/post";
import { updatePost } from "@/store/actions";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: PostInterface;
}

const Edit: React.FC<Props> = ({ open, setOpen, post }) => {
  const { user } = useUser();
  const dispatch: AppDispatch = useDispatch();
  const [text, setText] = useState(post.text);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    stopPropagation(e);
    toast.promise(editPostById(post.id, text), {
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
    <Modal open={open} setOpen={setOpen} title="Modo de edición">
      <Actions onClose={() => setOpen(false)} onSubmit={handleSubmit} />
      <div className="max-h-[80vh] px-2 md:px-5 overflow-y-auto">
        <Header username={user.username} pfp={user.pfp}>
          <div>
            <TextArea text={text} setText={setText} pasteImages={false} />
            <Content post={post} />
          </div>
        </Header>
      </div>
    </Modal>
  );
};

export default Edit;
