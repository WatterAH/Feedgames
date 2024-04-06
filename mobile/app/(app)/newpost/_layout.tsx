import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

const StackLayout = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#181818" : "#fff";

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          presentation: "modal",
          headerTitle: "Nuevo post",
          headerTitleStyle: { fontWeight: "700" },
          headerStyle: { backgroundColor },
        }}
      />
    </Stack>
  );
};

export default StackLayout;
