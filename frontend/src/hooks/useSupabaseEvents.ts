import shortUUID from "short-uuid";
import { toast } from "sonner";
import { addPost } from "@/store/feedSlice";
import { useEffect } from "react";
import { addNotify } from "@/store/activity";
import { addMyPost } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getNotifyById, getPostById, supabase } from "@/functions/db";
import { processNotify, processPost } from "@/functions/utils";

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
          const { new: newPost } = payload;
          const { post, error } = await getPostById(newPost.id);
          if (!error && post && !post?.parentId) {
            const newPost = processPost(post);
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
          const noty = processNotify(data);
          if (!error) {
            if (data.id_user == translator.toUUID(userId)) {
              dispatch(addNotify(noty));
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
