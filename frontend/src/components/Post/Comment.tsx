import React, { useState } from "react";
import Modal from "../Global/Modal";
import { PostInterface } from "@/interfaces/Post";
import Actions from "../New/layout/Actions";
import Header from "../New/layout/Header";
import { useUser } from "@/context/AuthContext";
import TextArea from "../New/TextArea";
import Preview from "../New/layout/Preview";
import ImageInput from "../New/image/ImageInput";
import { MatchShowCase } from "@/interfaces/Valorant";
import Content from "./Content";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: PostInterface;
}

const Comment: React.FC<Props> = ({ open, setOpen, data }) => {
  const { user } = useUser();
  const { user: userData } = data;
  const [text, setText] = useState("");
  const [_image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | MatchShowCase | null>(null);

  return (
    <Modal open={open} setOpen={setOpen} title="Respondiendo">
      <Actions
        onClose={() => setOpen(false)}
        onSubmit={(e) => console.log(e)}
      />
      <div className="max-h-[80vh] overflow-y-auto">
        <div className="mb-3 pr-5">
          <Header username={userData.username} pfp={userData.pfp}>
            <Content data={data} />
          </Header>
        </div>
        <div className="space-y-2">
          <Header username={user.username} pfp={user.pfp}>
            <div>
              <TextArea
                text={text}
                setText={setText}
                setPreview={setPreview}
                setImage={setImage}
              />
              <Preview preview={preview} setPreview={setPreview} />
              <div className="flex gap-x-2">
                <ImageInput setImage={setImage} setPreview={setPreview} />
              </div>
            </div>
          </Header>
        </div>
      </div>
    </Modal>
  );
};

export default Comment;
