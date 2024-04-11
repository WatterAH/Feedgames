import React from "react";
import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { SessionProvider } from "@/context/ctx";
import { RootSiblingParent } from "react-native-root-siblings";

const StackLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SessionProvider>
        <RootSiblingParent>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ presentation: "modal" }} />
          </Stack>
        </RootSiblingParent>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default StackLayout;
