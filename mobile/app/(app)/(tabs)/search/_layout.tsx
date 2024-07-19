import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

const StackLayout = () => {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";
  const backgroundColor = dark ? "#101010" : "#fff";
  const iconColor = dark ? "#fff" : "#101010";

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, headerTitle: "Inicio" }}
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
        name="results"
        options={{
          headerTitle: "",
          headerBackTitle: "Atrás",
          headerTintColor: iconColor,
          headerShadowVisible: false,
          headerStyle: { backgroundColor },
          headerTitleStyle: { fontWeight: "700" },
        }}
      />
    </Stack>
  );
};

export default StackLayout;
