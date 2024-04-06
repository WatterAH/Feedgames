import React from "react";
import { Link, Stack, router } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { Text } from "@/components/Global/Themed";

const StackLayout = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#101010" : "#fff";
  const iconColor = colorScheme === "dark" ? "#fff" : "#101010";

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Fg",
          headerTitleStyle: { fontFamily: "Pacifico", fontSize: 28 },
          headerTintColor: iconColor,
          headerStyle: { backgroundColor },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

export default StackLayout;
