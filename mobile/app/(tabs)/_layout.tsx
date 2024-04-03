import React, { useState } from "react";
import * as Solid from "react-native-heroicons/solid";
import * as Out from "react-native-heroicons/outline";
import Colors from "@/constants/Colors";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

export default () => {
  const colorScheme = useColorScheme();
  const [focusedTab, setFocusedTab] = useState("home");
  const color = colorScheme === "dark" ? "#fff" : "rgb(31 41 55)";

  const getTabIcon = (tabName: string) => {
    if (focusedTab === tabName) {
      switch (tabName) {
        case "home":
          return <Solid.HomeIcon size={26} color={color} />;
        case "create":
          return <Solid.PencilSquareIcon size={26} color={color} />;
        case "notifications":
          return <Solid.BellAlertIcon size={26} color={color} />;
        case "saved":
          return <Solid.BookmarkIcon size={26} color={color} />;
        case "profile":
          return <Solid.UserIcon size={26} color={color} />;
        default:
          return null;
      }
    } else {
      switch (tabName) {
        case "home":
          return <Out.HomeIcon size={26} color={color} />;
        case "create":
          return <Out.PencilSquareIcon size={26} color={color} />;
        case "notifications":
          return <Out.BellAlertIcon size={26} color={color} />;
        case "saved":
          return <Out.BookmarkIcon size={26} color={color} />;
        case "profile":
          return <Out.UserIcon size={26} color={color} />;
        default:
          return null;
      }
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Feedgames",
          headerShown: false,
          tabBarIcon: () => getTabIcon("home"),
          tabBarLabel: "",
          tabBarStyle: { padding: 32 },
        }}
        listeners={() => ({
          tabPress: () => {
            setFocusedTab("home");
          },
        })}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerShown: false,
          tabBarIcon: () => getTabIcon("create"),
          tabBarLabel: "",
          tabBarStyle: { padding: 32 },
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
          tabBarStyle: { padding: 32 },
        }}
        listeners={() => ({
          tabPress: () => {
            setFocusedTab("notifications");
          },
        })}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          tabBarIcon: () => getTabIcon("saved"),
          tabBarLabel: "",
          tabBarStyle: { padding: 32 },
        }}
        listeners={() => ({
          tabPress: () => {
            setFocusedTab("saved");
          },
        })}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: () => getTabIcon("profile"),
          tabBarLabel: "",
          tabBarStyle: { padding: 32 },
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
