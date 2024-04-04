import { Text, View } from "@/components/Global/Themed";
import { useSession } from "@/context/ctx";
import React from "react";

const profile = () => {
  const { logout } = useSession();
  return (
    <View className="h-full flex items-center justify-center">
      <Text
        onPress={() => {
          logout();
        }}
      >
        Logout
      </Text>
    </View>
  );
};

export default profile;
