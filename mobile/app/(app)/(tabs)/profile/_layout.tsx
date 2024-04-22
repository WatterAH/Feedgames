import React from "react";
import { Link, Stack } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { Bars3BottomRightIcon } from "react-native-heroicons/solid";

const StackLayout = () => {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#fff" : "#101010";
  const backgroundColor = colorScheme === "dark" ? "#101010" : "#fff";

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor },
          headerShadowVisible: false,
          headerTintColor: iconColor,
          headerRight: () => (
            <Link href="/profile/settings" asChild>
              <Pressable>
                <Bars3BottomRightIcon color={iconColor} size={28} />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerTitle: "Configuración",
          headerBackTitle: "Atrás",
          headerTintColor: iconColor,
          headerTitleStyle: { fontWeight: "700" },
        }}
      />
      <Stack.Screen
        name="likes"
        options={{
          headerTitle: "Tus Me gusta",
          headerBackTitle: "Atrás",
          headerTintColor: iconColor,
          headerTitleStyle: { fontWeight: "700" },
        }}
      />
      <Stack.Screen
        name="saves"
        options={{
          headerTitle: "Guardado",
          headerBackTitle: "Atrás",
          headerTintColor: iconColor,
          headerTitleStyle: { fontWeight: "700" },
        }}
      />
    </Stack>
  );
};

export default StackLayout;
