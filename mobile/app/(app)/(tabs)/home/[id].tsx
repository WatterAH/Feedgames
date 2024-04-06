import React, { useEffect } from "react";
import { Stack, useGlobalSearchParams } from "expo-router";
import { SafeAreaView } from "@/components/Global/Themed";
import { Profile } from "@/components/Profile/Profile";
import { useColorScheme } from "react-native";

const ExploreProfile = () => {
  const { id } = useGlobalSearchParams();
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#fff" : "#101010";
  const backgroundColor = colorScheme === "dark" ? "#101010" : "#fff";

  return (
    <SafeAreaView className="h-full flex-col items-center justify-center">
      <Stack.Screen
        options={{
          headerTitle: "",
          headerBackTitle: "Atrás",
          headerTintColor: iconColor,
          headerShadowVisible: false,
          headerStyle: { backgroundColor },
        }}
      />
      <Profile id={id as string} />
    </SafeAreaView>
  );
};

export default ExploreProfile;
