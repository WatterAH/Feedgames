import React from "react";
import Modal from "../Global/Modal";
import { PostInterface } from "@/interfaces/Post";
import Actions from "../New/layout/Actions";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: PostInterface;
}

const Comment: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <Modal open={open} setOpen={setOpen} title="Respondiendo">
      <Actions
        onClose={() => setOpen(false)}
        onSubmit={(e) => console.log(e)}
      />
    </Modal>
  );
};

export default Comment;
