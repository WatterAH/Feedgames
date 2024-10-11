"use client";
import Notify from "@/components/Notifications/Notify";
import Card from "@/layout/Pages/Card";
import Title from "@/layout/Pages/Title";
import InfiniteScroll from "react-infinite-scroll-component";
import { useUser } from "@/context/AuthContext";
import { useNotifications } from "@/hooks/useNotifications";
import { NotifysLoader } from "@/layout/Pages/Loaders";

export default function NotifyPage() {
  const { user } = useUser();
  const notifyData = useNotifications(user.id);
  const { notify, setNotify, getNotifications, hasMore, loading, error } =
    notifyData;

  return (
    <main className="flex flex-col h-screen items-center bg-barcelona relative">
      <Title title="Notificaciones" />
      <Card />
      <div className="w-full max-w-2xl md:mt-[10vh] pb-14 lg:pb-0 z-10">
        {loading && <NotifysLoader count={12} />}
        {error && <h1>Error</h1>}
        {!loading && !error && (
          <InfiniteScroll
            dataLength={notify.length}
            hasMore={hasMore}
            next={getNotifications}
            loader={<NotifysLoader count={2} />}
          >
            {notify.map((notify) => (
              <Notify key={notify.id} data={notify} setNotify={setNotify} />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </main>
  );
}
