import React from "react";
import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, headerTitle: "Inicio" }}
      />
    </Stack>
  );
};

export default StackLayout;
