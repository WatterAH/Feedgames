import React from "react";
import { Slot } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { SessionProvider } from "@/context/ctx";

const StackLayout = () => {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </ThemeProvider>
  );
};

export default StackLayout;
