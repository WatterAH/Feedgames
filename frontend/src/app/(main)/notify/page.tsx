"use client";
import Loader from "@/components/Global/Loader";
import Notify from "@/components/Notifications/Notify";
import Card from "@/layout/Pages/Card";
import Title from "@/layout/Pages/Title";
import { useUser } from "@/context/AuthContext";
import { useNotifications } from "@/hooks/useNotifications";

export default function NotifyPage() {
  const { user } = useUser();
  const { notifications, loading, error } = useNotifications(user.id);

  return (
    <main className="flex flex-col h-screen items-center bg-barcelona relative">
      <Title title="Notificaciones" />
      <Card />
      <div className="w-full max-w-2xl md:mt-[10vh] pb-14 lg:pb-0 z-10">
        {loading && <Loader size="large" color="dark" />}
        {error && <h1>Error</h1>}
        {!loading &&
          !error &&
          notifications.map((notify) => (
            <Notify key={notify.id} data={notify} />
          ))}
      </div>
    </main>
  );
}
