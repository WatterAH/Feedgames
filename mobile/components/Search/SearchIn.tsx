import React from "react";
import { Text, View } from "../Global/Themed";
import { Pressable } from "react-native";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/solid";
import { router } from "expo-router";

interface Props {
  searchTerm: string;
}

export const SearchIn: React.FC<Props> = React.memo(({ searchTerm }) => {
  const handleSubmit = () => {
    router.push({ pathname: "/search/results", params: { searchTerm } });
  };

  return (
    <Pressable
      onPress={handleSubmit}
      className="flex flex-row w-full items-center justify-between px-5 py-3 border-b border-light-gray dark:border-dark-gray"
    >
      <View className="flex flex-row items-center" style={{ columnGap: 12 }}>
        <MagnifyingGlassIcon size={24} color="#777" />
        <Text className="font-semibold">Buscar "{searchTerm}"</Text>
      </View>
      <ChevronRightIcon size={24} color="#777" />
    </Pressable>
  );
});
