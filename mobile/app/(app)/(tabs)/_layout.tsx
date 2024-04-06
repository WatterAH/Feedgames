import React, { useState } from "react";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import * as Solid from "react-native-heroicons/solid";
import * as Out from "react-native-heroicons/outline";
import { useScrollToTop } from "@react-navigation/native";

export default () => {
  const colorScheme = useColorScheme();
  const [focusedTab, setFocusedTab] = useState("home");
  const iconColor = colorScheme === "dark" ? "#fff" : "#000";
  const tabStyle = {
    backgroundColor: colorScheme === "dark" ? "#101010" : "#fff",
    marginBottom: 6,
    paddingTop: 18,
  };

  const getTabIcon = (tabName: string) => {
    if (focusedTab === tabName) {
      switch (tabName) {
        case "home":
          return <Solid.HomeIcon size={26} color={iconColor} />;
        case "search":
          return <Solid.MagnifyingGlassIcon size={26} color={iconColor} />;
        case "create":
          return <Solid.PencilSquareIcon size={26} color={iconColor} />;
        case "notifications":
          return <Solid.BellAlertIcon size={26} color={iconColor} />;

        case "profile":
          return <Solid.UserIcon size={26} color={iconColor} />;
        default:
          return null;
      }
    } else {
      switch (tabName) {
        case "home":
          return <Out.HomeIcon size={26} color={iconColor} />;
        case "search":
          return <Out.MagnifyingGlassIcon size={26} color={iconColor} />;
        case "create":
          return <Out.PencilSquareIcon size={26} color={iconColor} />;
        case "notifications":
          return <Out.BellAlertIcon size={26} color={iconColor} />;

        case "profile":
          return <Out.UserIcon size={26} color={iconColor} />;
        default:
          return null;
      }
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: tabStyle,
      }}
      className="bg-black"
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: () => getTabIcon("home"),
          tabBarLabel: "",
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
          tabBarLabel: "",
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
          tabBarLabel: "",
        }}
        listeners={() => ({
          tabPress: () => {
            setFocusedTab("create");
          },
        })}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          headerShown: false,
          tabBarIcon: () => getTabIcon("notifications"),
          tabBarLabel: "",
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
          tabBarLabel: "",
        }}
        listeners={() => ({
          tabPress: () => {
            setFocusedTab("profile");
          },
        })}
      />
    </Tabs>
  );
};
