"use client";
import Card from "@/components/Global/Card";
import Loader from "@/components/Global/Loader";
import Notify from "@/components/Notifications/Notify";
import { useUser } from "@/context/AuthContext";
import { useNotifications } from "@/hooks/useNotifications";

export default function NotifyPage() {
  const { user } = useUser();
  const { notifications, loading, error } = useNotifications(user.id);

  return (
    <main className="flex flex-col h-screen justify-center items-center bg-barcelona sm:pt-1 md:pt-4 gap-y-3">
      <h1 className="font-semibold text-threads hidden md:block">
        Notificaciones
      </h1>
      <Card loading={loading}>
        {loading && <Loader size="large" color="dark" />}
        {error && <h1>Error</h1>}
        {!loading && !error && (
          <div className="pb-14 lg:pb-0">
            {notifications.map((notify) => (
              <Notify key={notify.id} data={notify} />
            ))}
          </div>
        )}
      </Card>
    </main>
  );
}
