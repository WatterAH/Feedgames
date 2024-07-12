import React, { useState } from "react";
import { Tabs, router } from "expo-router";
import { useColorScheme } from "react-native";
import * as Solid from "react-native-heroicons/solid";
import * as Out from "react-native-heroicons/outline";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

export default () => {
  const colorScheme = useColorScheme();
  const [focusedTab, setFocusedTab] = useState("home");
  const iconColor = colorScheme === "dark" ? "#fff" : "#000";
  const bg = useColorScheme() === "dark" ? DarkTheme : DefaultTheme;
  const tabStyle = {
    backgroundColor: colorScheme === "dark" ? "#101010" : "#fff",
    height: 90,
    borderTopWidth: 0,
    paddingHorizontal: 18,
  };

  const getTabIcon = (tabName: string) => {
    if (focusedTab === tabName) {
      switch (tabName) {
        case "home":
          return <Solid.HomeIcon size={29} color={iconColor} />;
        case "search":
          return <Solid.MagnifyingGlassIcon size={29} color={iconColor} />;
        case "create":
          return <Solid.PlusIcon size={29} color={iconColor} />;
        case "notifications":
          return <Solid.BellAlertIcon size={29} color={iconColor} />;

        case "profile":
          return <Solid.UserIcon size={29} color={iconColor} />;
        default:
          return null;
      }
    } else {
      switch (tabName) {
        case "home":
          return <Out.HomeIcon size={29} color={iconColor} />;
        case "search":
          return <Out.MagnifyingGlassIcon size={29} color={iconColor} />;
        case "create":
          return <Out.PlusIcon size={29} color={iconColor} />;
        case "notifications":
          return <Out.BellAlertIcon size={29} color={iconColor} />;

        case "profile":
          return <Out.UserIcon size={29} color={iconColor} />;
        default:
          return null;
      }
    }
  };

  return (
    <ThemeProvider value={bg}>
      <Tabs
        screenOptions={{
          tabBarStyle: tabStyle,
          tabBarShowLabel: false,
        }}
        className="bg-black"
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: () => getTabIcon("home"),
          }}
          listeners={() => ({
            tabPress: () => {
              setFocusedTab("home");
            },
          })}
        />
        <Tabs.Screen
          name="search"
          options={{
            headerTitle: "",
            headerShown: false,
            tabBarIcon: () => getTabIcon("search"),
          }}
          listeners={() => ({
            tabPress: () => {
              setFocusedTab("search");
            },
          })}
        />
        <Tabs.Screen
          name="create"
          options={{
            headerShown: false,
            tabBarIcon: () => getTabIcon("create"),
          }}
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault();
              router.navigate("/newpost");
            },
          })}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            headerShown: false,
            tabBarIcon: () => getTabIcon("notifications"),
          }}
          listeners={() => ({
            tabPress: () => {
              setFocusedTab("notifications");
            },
          })}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarIcon: () => getTabIcon("profile"),
          }}
          listeners={() => ({
            tabPress: () => {
              setFocusedTab("profile");
            },
          })}
        />
      </Tabs>
    </ThemeProvider>
  );
};
