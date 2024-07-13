import React from "react";
import { Link, Stack } from "expo-router";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";

const StackLayout = () => {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";
  const backgroundColor = dark ? "#101010" : "#fff";
  const iconColor = dark ? "#fff" : "#101010";
  const bg = useColorScheme() === "dark" ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={bg}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Fg",
            headerTitleStyle: { fontFamily: "Pacifico", fontSize: 28 },
            headerTintColor: iconColor,
            headerRight: () => (
              <Link href="/home/messages">
                <FontAwesome6
                  name="comments"
                  size={24}
                  color={dark ? "white" : "black"}
                />
              </Link>
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
        <Stack.Screen name="messages" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
};

export default StackLayout;
