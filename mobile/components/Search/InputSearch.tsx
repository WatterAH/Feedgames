import React from "react";
import { TextInput, useColorScheme } from "react-native";
import { View } from "../Global/Themed";
import { FontAwesome5 } from "@expo/vector-icons";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";

export const InputSearch = () => {
  const backgroundColor = useColorScheme() === "dark" ? "#202020" : "#ebebeb";

  return (
    <View className="flex-row items-center gap-x-2 px-4 relative">
      <View
        className="absolute left-7 z-20 flex items-center justify-center"
        darkColor="transparent"
        lightColor="transparent"
      >
        <MagnifyingGlassIcon size={18} color="#777" />
      </View>
      <TextInput
        className="rounded-xl w-full h-10 pl-9 z-10"
        returnKeyType="search"
        cursorColor="#777"
        placeholder="Buscar"
        style={{ backgroundColor }}
      ></TextInput>
    </View>
  );
};
