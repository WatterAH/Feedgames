import React, { useState } from "react";
import Modal from "../Global/Modal";
import Actions from "../New/layout/Actions";
import Header from "../New/layout/Header";
import TextArea from "../New/TextArea";
import Preview from "../New/layout/Preview";
import { useUser } from "@/context/AuthContext";
import { MatchShowCase } from "@/interfaces/Valorant";
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
  const [text, setText] = useState(post.content);
  const src = post.publicUrl
    ? `https://zptrwdrgobouoriwsfoj.supabase.co/storage/v1/object/public/Images/images/${post.publicUrl}`
    : null;
  const [preview, setPreview] = useState<string | MatchShowCase | null>(
    src || post.valMatch || null
  );

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
            <Preview
              preview={preview}
              setPreview={setPreview}
              showsClose={false}
            />
          </div>
        </Header>
      </div>
    </Modal>
  );
};

export default Edit;
