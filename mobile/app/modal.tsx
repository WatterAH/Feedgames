import React from "react";
import { Stack, router } from "expo-router";
import { Text, View } from "@/components/Global/Themed";

const modal = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        rowGap: 4,
      }}
    >
      <Stack.Screen options={{ presentation: "transparentModal" }} />
      <Text onPress={() => router.replace("/login")}>modal</Text>
    </View>
  );
};

export default modal;
