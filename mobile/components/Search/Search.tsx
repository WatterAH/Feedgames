import React from "react";
import { View } from "../Global/Themed";
import { TextInput } from "react-native";

export const Search = () => {
  return (
    <View
      className="relative w-full"
      darkColor="rgb(0, 0, 0)"
      lightColor="#eee"
    >
      <View
        className="px-6 flex items-center"
        darkColor="rgb(0, 0, 0)"
        lightColor="#eee"
      >
        <TextInput
          placeholder="Busca personas..."
          className="px-3 font-montserrat text-base md:text-sm py-2 outline-none border border-gray-300 rounded-lg w-full dark:bg-neutral-700 dark:border-none dark:border-gray-900 dark:text-white"
        ></TextInput>
      </View>
    </View>
  );
};
