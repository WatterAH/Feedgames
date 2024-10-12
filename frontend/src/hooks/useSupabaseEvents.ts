import { supabase } from "@/functions/db";
import { addPost } from "@/store/feedSlice";
import { AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useSubscribeToNewPosts = (userId: string) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const chanel = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        async (payload) => {
          const { new: post } = payload;
          const { data, error } = await supabase
            .from("posts")
            .select(
              "*, liked(id_user), saved(id_user), comments(id, id_user), user:users(username, name, pfp)"
            )
            .eq("id", post.id)
            .single();
          if (!error) {
            const { liked, saved, comments, ...rest } = data;
            const newPost = {
              ...rest,
              liked: liked.length,
              saved: saved.length,
              comments: comments.length,
            };
            dispatch(addPost(newPost));
            if (post.user_id !== userId) {
              toast.info("Nuevos posts");
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(chanel);
    };
  }, [dispatch, userId]);
};
