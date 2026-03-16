import shortUUID from "short-uuid";
import alertRouter from "@/routes/alerts";
import { toast } from "sonner";
import { addPost } from "@/store/feedSlice";
import { useEffect } from "react";
import { addAlert, setNewAlert } from "@/store/activity";
import { addMyPost } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { supabase } from "@/functions/db";
import postRouter from "@/routes/post";

const translator = shortUUID();

const handleNewPost = async (
  payload: any,
  userId: string,
  dispatch: AppDispatch,
) => {
  const { new: newPost } = payload;
  const userPostId = translator.fromUUID(newPost.user_id);

  if (userPostId === userId) return;

  const post = await postRouter.find(newPost.id, "");

  dispatch(addPost(post));

  if (post.user_id === translator.toUUID(userId)) {
    dispatch(addMyPost(post));
  } else {
    toast("Nuevas publicaciones");
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

  const { alerts } = useSelector((state: RootState) => state.activity);
  const shouldUpdate = alerts.length > 0;

  useEffect(() => {
    if (userId == "aRwwhM2xr7U9nWiFC12Ymb") return;

    const chanel_notify = supabase
      .channel("chanel_notify")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "alerts" },
        async (payload) => handleAlert(payload, userId, dispatch),
      )
      .subscribe();

    const hasUnread = async () => alertRouter.hasAlerts(userId);
    hasUnread().then((value) => dispatch(setNewAlert(value)));

    return () => {
      supabase.removeChannel(chanel_notify);
    };
  }, [dispatch, userId, alerts.length, shouldUpdate]);
};
