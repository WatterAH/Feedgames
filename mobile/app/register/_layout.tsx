import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

const StackLayout = () => {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#fff" : "#101010";
  const backgroundColor = colorScheme === "dark" ? "#101010" : "#fff";
  const screenOptions = {
    headerTitle: "Feedgames",
    headerBackTitle: "Atrás",
    headerTitleStyle: { fontFamily: "Pacifico", fontSize: 28 },
    headerTintColor: iconColor,
    headerStyle: { backgroundColor },
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Feedgames",
          headerTintColor: iconColor,
          headerTitleStyle: { fontFamily: "Pacifico", fontSize: 28 },
          headerStyle: { backgroundColor },
        }}
      />
      <Stack.Screen name="username" options={screenOptions} />
      <Stack.Screen name="details" options={screenOptions} />
      <Stack.Screen name="password" options={screenOptions} />
      <Stack.Screen name="image" options={screenOptions} />
    </Stack>
  );
};

export default StackLayout;
