"use client";
import Notify from "@/components/Notifications/Notify";
import Card from "@/layout/Pages/Card";
import Title from "@/layout/Pages/Title";
import Error from "@/layout/Pages/Error";
import InfiniteScroll from "react-infinite-scroll-component";
import { useUser } from "@/context/AuthContext";
import { NotifysLoader } from "@/layout/Pages/Loaders";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNotifications } from "@/store/activity";
import Empty from "@/layout/Pages/Empty";

export default function NotifyPage() {
  const { user } = useUser();
  const dispatch: AppDispatch = useDispatch();
  const { notifications, hasMore, loading, error } = useSelector(
    (state: RootState) => state.activity
  );

  useEffect(() => {
    if (user?.id && notifications.length == 0) {
      dispatch(fetchNotifications(user.id, 10));
    }
  }, [dispatch, user?.id, notifications.length]);

  const getMoreNotify = () => {
    if (hasMore && !loading && user?.id) {
      dispatch(fetchNotifications(user.id, 10));
    }
  };

  const RenderContent = () => {
    if (loading && notifications.length == 0)
      return <NotifysLoader count={12} />;
    if (error && notifications.length == 0) return <Error />;
    if (notifications.length == 0)
      return <Empty text="Aún no tienes notificaciones" full />;
    return (
      <InfiniteScroll
        dataLength={notifications.length}
        hasMore={hasMore}
        next={getMoreNotify}
        loader={<NotifysLoader count={2} />}
      >
        {notifications.map((notify, i) => (
          <Notify
            key={notify.id}
            data={notify}
            isLast={i == notifications.length - 1}
          />
        ))}
      </InfiniteScroll>
    );
  };

  return (
    <>
      <Title title="Notificaciones" />
      <Card />
      <div className="w-full max-w-2xl py-14 md:pt-0 md:mt-[11vh] lg:pb-0 z-10">
        <RenderContent />
      </div>
    </>
  );
}
