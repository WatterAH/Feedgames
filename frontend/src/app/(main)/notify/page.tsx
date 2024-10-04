"use client";
import Card from "@/components/Global/Card";
import PageLoader from "@/components/Global/PageLoader";
import Notify from "@/components/Notifications/Notify";
import { useUser } from "@/context/AuthContext";
import { useNotifications } from "@/hooks/useNotifications";

export default function NotifyPage() {
  const { user } = useUser();
  const { notifications, loading, error } = useNotifications(user.id);

  return (
    <main className="flex flex-col lg:ml-20 h-screen justify-center items-center  bg-barcelona sm:pt-1 md:pt-4 gap-y-3">
      <h1 className="font-semibold text-threads hidden md:block">
        Notificaciones
      </h1>
      <Card loading={loading}>
        {loading && <PageLoader />}
        {error && <h1>Error</h1>}
        {!loading && !error && (
          <div className="h-screen pb-16">
            {notifications.map((notify) => (
              <Notify key={notify.id} data={notify} />
            ))}
          </div>
        )}
      </Card>
    </main>
  );
}
