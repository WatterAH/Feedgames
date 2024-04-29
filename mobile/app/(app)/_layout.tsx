import { Redirect, Stack } from "expo-router";
import { Text } from "@/components/Global/Themed";
import { useSession } from "@/context/ctx";
import { Platform, Pressable, useColorScheme } from "react-native";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#101010" : "#fff";
  const iconColor = colorScheme === "dark" ? "#fff" : "#000";

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="newpost"
        options={{
          presentation: Platform.OS == "ios" ? "modal" : "card",
          headerTitle: "Nuevo post",
          headerTitleStyle: { fontWeight: "700" },
          headerTintColor: iconColor,
          headerStyle: { backgroundColor },
        }}
      />
    </Stack>
  );
}
