import React, { useCallback, useState } from "react";
import { SafeAreaView } from "@/components/Global/Themed";
import { useSession } from "@/context/ctx";
import { useNotifications } from "@/hooks/useNotifications";
import { Loading } from "@/components/Global/Loading";
import { FlatList, RefreshControl } from "react-native";
import { Notify } from "@/components/Notifications/Notify";

const notifications = () => {
  const { user } = useSession();
  const { loadingPage, notifications, getNotifications } = useNotifications(
    user?.id
  );
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(() => {
    setLoading(true);
    getNotifications().then(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView className="h-full w-full flex-col items-center justify-center">
      {loadingPage ? (
        <Loading size="large" />
      ) : (
        <SafeAreaView className="w-full h-full py-2">
          <FlatList
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={refresh} />
            }
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Notify data={item} />}
          />
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

export default notifications;
