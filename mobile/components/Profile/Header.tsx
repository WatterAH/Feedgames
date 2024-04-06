import React from "react";
import { Text, View } from "../Global/Themed";
import { Pressable, useColorScheme } from "react-native";
import { Bars3BottomRightIcon } from "react-native-heroicons/solid";
import { Link } from "expo-router";
import { GlobeAltIcon } from "react-native-heroicons/outline";

export const Header = () => {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#fff" : "#101010";
  return (
    <View className="flex-row items-center justify-between px-4 py-4">
      <Pressable>
        <GlobeAltIcon color={iconColor} size={28} />
      </Pressable>
      <Link href="/profile/settings" asChild>
        <Pressable>
          <Bars3BottomRightIcon color={iconColor} size={28} />
        </Pressable>
      </Link>
    </View>
  );
};
