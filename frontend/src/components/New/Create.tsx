import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import TextArea from "./TextArea";
import MatchInput from "./valorant/MatchInput";
import ImageInput from "./image/ImageInput";
import Canvas from "./pixels/Canvas";
import Preview from "./layout/Preview";
import { toast } from "sonner";
import { useUser } from "@/context/AuthContext";
import postRouter from "@/routes/post";
import { useGetMatches } from "@/hooks/useValorant";
import { ContentObject } from "@/interfaces/Post";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "@/store/feedSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Check, SquarePen, X } from "lucide-react";
import { fetchUser } from "@/store/userSlice";

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
    if (!user) dispatch(fetchUser(userSession.id));
  }, [dispatch]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user?.id) return;

    if (!text.trim() && !content) {
      return toast.error(
        "Tu post necesita un poco de vida. ¿Texto o imagen, tal vez?",
      );
    }

    setOpen(false);
    toast.promise(postRouter.create(user.id, text, content), {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="fixed p-5 bg-(--foreground) border border-(--border) shadow-md rounded-md bottom-16 right-3 lg:right-10 hidden lg:flex justify-center items-center outline-none active:scale-90 transition-all cursor-pointer">
        <SquarePen size={36} className="text-(--text)" />
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-xl">
        <DialogHeader className="border-b px-3 py-1">
          <div className="flex w-full text-(--text) items-center justify-between">
            <button
              onClick={() => setOpen(false)}
              className="rounded-full hover:bg-(--hover) p-2 transition-all duration-500"
            >
              <X />
            </button>
            <DialogTitle>Nueva publicación</DialogTitle>
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
      </DialogContent>
    </Dialog>
  );
};

export default Create;
