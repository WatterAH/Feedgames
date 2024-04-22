import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "../Global/Themed";
import { useSession } from "@/context/ctx";
import { Notification } from "@/interfaces/Notification";
import { getMyNotifications } from "@/api/notifications";
import { FlatList, RefreshControl } from "react-native";
import { Notify } from "./Notify";
import { Loading } from "../Global/Loading";

export const Notifications = () => {
  const { user } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNotifications = async (loadType: "page" | "refresh") => {
    try {
      if (loadType == "page") {
        setLoadingPage(true);
      } else {
        setLoading(true);
      }
      if (user?.id) {
        const dataFetched = await getMyNotifications(user.id);
        setNotifications(dataFetched);
        if (loadType == "page") {
          setLoadingPage(false);
        } else {
          setLoading(false);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleNotifications("page");
  }, []);

  return loadingPage ? (
    <Loading size="large" />
  ) : (
    <SafeAreaView className="w-full h-full py-2">
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => handleNotifications("refresh")}
          />
        }
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Notify data={item} />}
      />
    </SafeAreaView>
  );
};
