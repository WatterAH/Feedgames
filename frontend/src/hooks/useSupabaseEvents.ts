import shortUUID from "short-uuid";
import postRouter from "@/routes/post";
import alertRouter from "@/routes/alerts";
import { toast } from "sonner";
import { addPost } from "@/store/feedSlice";
import { useEffect } from "react";
import { addAlert, setNewAlert } from "@/store/activity";
import { addMyPost } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { supabase } from "@/functions/db";

const translator = shortUUID();

const handleNewPost = async (
  payload: any,
  userId: string,
  dispatch: AppDispatch,
) => {
  const { new: post } = payload;
  const newPost = await postRouter.find(post.id, "");

  if (newPost.user_id !== translator.toUUID(userId)) {
    dispatch(addPost(newPost));
    toast("Nuevas publicaciones");
  } else {
    dispatch(addMyPost(newPost));
  }
};

const handleAlert = async (
  payload: any,
  userId: string,
  dispatch: AppDispatch,
) => {
  const { new: alert } = payload;
  const newAlert = await alertRouter.find(alert.id);

  if (newAlert.receiver_id === translator.toUUID(userId)) {
    dispatch(addAlert(newAlert));
    dispatch(setNewAlert(true));
    toast("Tienes nuevas notificaciones");
  }
};

export const subscribeToAlerts = (userId: string) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (userId == "aRwwhM2xr7U9nWiFC12Ymb") return;

    const channel_alerts = supabase
      .channel("channel_alerts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "alerts" },
        async (payload) => handleAlert(payload, userId, dispatch),
      )
      .subscribe();

    const channel_posts = supabase
      .channel("channel_posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        async (payload) => handleNewPost(payload, userId, dispatch),
      )
      .subscribe();

    const hasUnread = async () => alertRouter.hasAlerts(userId);
    hasUnread().then((value) => dispatch(setNewAlert(value)));

    return () => {
      supabase.removeChannel(channel_alerts);
      supabase.removeChannel(channel_posts);
    };
  }, [dispatch, userId]);
};
