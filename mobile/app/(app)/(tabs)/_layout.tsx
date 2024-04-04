import React, { useState } from "react";
import * as Solid from "react-native-heroicons/solid";
import * as Out from "react-native-heroicons/outline";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Text } from "@/components/Global/Themed";

export default () => {
  const colorScheme = useColorScheme();
  const [focusedTab, setFocusedTab] = useState("home");
  const color = colorScheme === "dark" ? "#fff" : "rgb(31 41 55)";
  const tabStyle = {
    backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
    marginBottom: 6,
    paddingTop: 18,
  };

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
      screenOptions={{ tabBarActiveTintColor: "rgb(0, 0, 0)" }}
      className="bg-black"
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          headerLeft: () => (
            <Text
              className="text-2xl pl-5 pt-1"
              style={{ fontFamily: "Pacifico" }}
            >
              Feedgames
            </Text>
          ),
          headerRight: () => (
            <Solid.MagnifyingGlassIcon
              color={colorScheme === "dark" ? "#fff" : "#000"}
              size={30}
              style={{ paddingRight: 50 }}
            />
          ),
          tabBarIcon: () => getTabIcon("home"),
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "rgb(0, 0, 0)" : "#fff",
            height: 100,
          },
          tabBarLabel: "",
          tabBarStyle: tabStyle,
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
          tabBarStyle: tabStyle,
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
          tabBarStyle: tabStyle,
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
          tabBarStyle: tabStyle,
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
          title: "",
          headerLeft: () => <Text className="text-xl pl-5">Watter.jsx</Text>,
          headerStyle: { backgroundColor: "rgb(0, 0, 0)" },
          tabBarIcon: () => getTabIcon("profile"),
          tabBarLabel: "",
          tabBarStyle: tabStyle,
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
