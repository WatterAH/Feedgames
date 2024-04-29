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
          headerTitle: "Notificaciones",
          headerTintColor: iconColor,
          headerTitleStyle: { fontWeight: "700" },
        }}
      />
      <Stack.Screen
        name="post"
        options={{
          headerTitle: "Post",
          headerBackTitle: "Atrás",
          headerTintColor: iconColor,
          headerShadowVisible: false,
          headerStyle: { backgroundColor },
          headerTitleStyle: { fontWeight: "700" },
        }}
      />
      <Stack.Screen
        name="comment"
        options={{
          headerTitle: "Comentario",
          headerBackTitle: "Atrás",
          headerTintColor: iconColor,
          headerShadowVisible: false,
          headerStyle: { backgroundColor },
          headerTitleStyle: { fontWeight: "700" },
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerTitle: "",
          headerBackTitle: "Atrás",
          headerTintColor: iconColor,
          headerShadowVisible: false,
          headerStyle: { backgroundColor },
        }}
      />
    </Stack>
  );
};

export default StackLayout;
