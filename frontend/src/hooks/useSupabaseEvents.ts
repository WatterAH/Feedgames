import shortUUID from "short-uuid";
import { toast } from "sonner";
import { addPost } from "@/store/feedSlice";
import { useEffect } from "react";
import { addNotify } from "@/store/activity";
import { addMyPost } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getNotifyById, getPostById, supabase } from "@/functions/db";

const translator = shortUUID();

export const useSubscribeToNewPosts = (userId: string) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const chanel = supabase
      .channel("chanel_posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        async (payload) => {
          const { new: post } = payload;
          const { data, error } = await getPostById(post.id);
          if (!error) {
            const { liked, saved, comments, user_id, ...rest } = data;
            const newPost = {
              user_id: translator.fromUUID(user_id),
              liked: liked.length,
              saved: saved.length,
              comments: comments.length,
              ...rest,
            };
            dispatch(addPost(newPost));
            if (post.user_id == translator.toUUID(userId)) {
              dispatch(addMyPost(newPost));
            } else {
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

export const useSubscribeToNotify = (userId: string) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const chanel = supabase
      .channel("chanel_notify")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notify",
        },
        async (payload) => {
          const { new: notify } = payload;
          const { data, error } = await getNotifyById(notify.id);
          if (!error) {
            if (data.id_user == translator.toUUID(userId)) {
              dispatch(addNotify(data));
              toast.info(`${data.user.username}: ${data.text}`);
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
