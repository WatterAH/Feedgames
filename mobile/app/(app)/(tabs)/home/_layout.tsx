import React from "react";
import { Stack } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";

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
          headerRight: () => (
            <Pressable>
              <MagnifyingGlassIcon color={iconColor} size={28} />
            </Pressable>
          ),
          headerStyle: { backgroundColor },
          headerShadowVisible: false,
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
    </Stack>
  );
};

export default StackLayout;
