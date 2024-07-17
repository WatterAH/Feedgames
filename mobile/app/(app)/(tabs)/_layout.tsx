import React from "react";
import { Tabs, useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { View } from "@/components/Global/Themed";
import { AntDesign, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import * as Haptic from "expo-haptics";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

export default () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const dark = colorScheme === "dark";
  const tabStyle = {
    backgroundColor: dark ? "#101010" : "#fff",
    height: 90,
    borderTopWidth: 0,
    paddingHorizontal: 18,
  };

  return (
    <ThemeProvider value={dark ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          tabBarStyle: tabStyle,
          tabBarShowLabel: false,
          tabBarActiveTintColor: dark ? "#eaeaea" : "#202020",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="house" size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            headerTitle: "",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesome name="search" size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <View
                darkColor="#202020"
                lightColor="#eaeaea"
                className="flex items-center justify-center rounded-xl h-11 w-16"
              >
                <FontAwesome6 name="plus" size={26} color={color} />
              </View>
            ),
          }}
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault();
              router.navigate("/newpost");
              Haptic.notificationAsync(Haptic.NotificationFeedbackType.Success);
            },
          })}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <AntDesign name="heart" size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="user-large" size={25} color={color} />
            ),
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
};
