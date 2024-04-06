import { Redirect, Stack } from "expo-router";
import { Text } from "@/components/Global/Themed";
import { useSession } from "@/context/ctx";
import { useColorScheme } from "react-native";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#101010" : "#fff";

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
          presentation: "modal",
          headerTitle: "Nuevo post",
          headerTitleStyle: { fontWeight: "700" },
          headerStyle: { backgroundColor },
        }}
      />
    </Stack>
  );
}
