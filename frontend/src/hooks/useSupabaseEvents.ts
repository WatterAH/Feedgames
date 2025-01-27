import shortUUID from "short-uuid";
import { toast } from "sonner";
import { addPost } from "@/store/feedSlice";
import { useEffect } from "react";
import { addNotify, setNewNotify } from "@/store/activity";
import { addMyPost } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getNotifyById, getPostById, supabase } from "@/functions/db";
import { processNotify, processPost } from "@/functions/utils";
import { hasAlerts } from "@/routes/alerts";

const translator = shortUUID();

const handleNewPost = async (
  payload: any,
  userId: string,
  dispatch: AppDispatch
) => {
  const { new: newPost } = payload;
  const userPostId = translator.fromUUID(newPost.user_id);

  if (userPostId === userId) return;

  const { post, error } = await getPostById(newPost.id);

  if (error || !post || post?.parentId) return;

  const result = processPost(post);
  dispatch(addPost(result));

  if (post.user_id === translator.toUUID(userId)) {
    dispatch(addMyPost(result));
  } else {
    toast("Nuevas publicaciones");
  }
};

const handleNewNotification = async (
  payload: any,
  userId: string,
  dispatch: AppDispatch,
  shouldDispatch: boolean
) => {
  const { new: notify } = payload;
  const { data, error } = await getNotifyById(notify.id);

  if (error || !data) return;

  const result = processNotify(data);

  if (data.id_user === translator.toUUID(userId)) {
    if (shouldDispatch) dispatch(addNotify(result));
    dispatch(setNewNotify(true));
    toast(`${data.user.username}: ${data.text}`);
  }
};

export const useSubscribeToUpdates = (userId: string) => {
  const dispatch: AppDispatch = useDispatch();

  const { notifications } = useSelector((state: RootState) => state.activity);
  const shouldUpdate = notifications.length > 0;

  useEffect(() => {
    const chanel_post = supabase
      .channel("chanel_posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        async (payload) => handleNewPost(payload, userId, dispatch)
      )
      .subscribe();

    const chanel_notify = supabase
      .channel("chanel_notify")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notify" },
        async (payload) =>
          handleNewNotification(payload, userId, dispatch, shouldUpdate)
      )
      .subscribe();

    const hasUnread = async () => await hasAlerts(userId);
    hasUnread().then((value) => dispatch(setNewNotify(value)));

    return () => {
      supabase.removeChannel(chanel_post);
      supabase.removeChannel(chanel_notify);
    };
  }, [dispatch, userId, notifications.length, shouldUpdate]);
};
