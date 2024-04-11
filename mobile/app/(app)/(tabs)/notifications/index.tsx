import React from "react";
import { SafeAreaView } from "@/components/Global/Themed";
import { Notifications } from "@/components/Notifications/Notifications";

const notifications = () => {
  return (
    <SafeAreaView className="h-full w-full flex-col items-center justify-center">
      <Notifications />
    </SafeAreaView>
  );
};

export default notifications;
