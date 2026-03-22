"use client";
import Alert from "@/components/Alert/Alert";
import Card from "@/components/Layout/Card";
import Title from "@/components/Layout/Title";
import Error from "@/components/Layout/Error";
import InfiniteScroll from "react-infinite-scroll-component";
import { useUser } from "@/context/AuthContext";
import { NotifysLoader } from "@/components/Layout/Loaders";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAlerts } from "@/store/activity";
import Empty from "@/components/Layout/Empty";
import alertRouter from "@/routes/alerts";

const AlertPage = () => {
  const { user } = useUser();
  const dispatch: AppDispatch = useDispatch();
  const { alerts, hasMore, loading, error } = useSelector(
    (state: RootState) => state.activity,
  );

  useEffect(() => {
    if (user?.id && alerts.length == 0) {
      dispatch(fetchAlerts(user.id, 15));
    }
  }, [dispatch, user?.id, alerts.length]);

  useEffect(() => {
    const read = async () => await alertRouter.readAlerts(user.id);
    read();
  }, []);

  const getMoreNotify = () => {
    if (hasMore && !loading && user?.id) {
      dispatch(fetchAlerts(user.id, 15));
    }
  };

  const RenderContent = () => {
    if (loading && alerts.length == 0) return <NotifysLoader count={12} />;
    if (error && alerts.length == 0) return <Error />;
    if (alerts.length == 0)
      return <Empty text="Aún no tienes notificaciones" full />;
    return (
      <InfiniteScroll
        dataLength={alerts.length}
        hasMore={hasMore}
        next={getMoreNotify}
        loader={<NotifysLoader count={2} />}
      >
        {alerts.map((alert) => (
          <Alert key={alert.id} data={alert} />
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
};

export default AlertPage;
