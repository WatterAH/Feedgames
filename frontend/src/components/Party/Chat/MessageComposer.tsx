import { useUser } from "@/context/AuthContext";
import { useParty } from "@/hooks/useParty";
import { Message, Party } from "@/interfaces/Party";
import messageRouter from "@/routes/message";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props extends Party {
  hookParty: ReturnType<typeof useParty>;
}

const MessageComposer: React.FC<Props> = ({ hookParty, ...party }) => {
  const { id: party_id } = party;
  const { user } = useUser();
  const { setMessages } = hookParty;
  const [content, setContent] = useState("");

  async function handleSendMessage() {
    if (!content) return;
    setContent("");

    const data: Partial<Message> = {
      content,
      user_id: user.id,
      party_id,
      type: "text",
      created_at: new Date().toISOString(),
      user: { ...user },
    };

    try {
      setMessages((prev) => [data as Message, ...prev]);
      await messageRouter.send(data);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <form className="shrink-0 p-2 flex items-end gap-2 border border-(--border) bg-(--foreground) rounded-2xl shadow-2xl mb-4 mx-0 md:mx-4">
      <input
        type="text"
        placeholder="Mensaje..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 min-w-0 outline-none p-2 rounded-lg)"
      />
      <button
        type="submit"
        onClick={handleSendMessage}
        disabled={!content}
        className="shrink-0 px-4 py-2 font-semibold text-(--foreground) bg-(--text) rounded-lg active:scale-95 transition-transform"
      >
        Enviar
      </button>
    </form>
  );
};

export default MessageComposer;
