import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

const StackLayout = () => {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#fff" : "#101010";
  const backgroundColor = colorScheme === "dark" ? "#101010" : "#fff";

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
