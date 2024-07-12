import React from "react";
import { SafeAreaView } from "@/components/Global/Themed";
import { TextInput } from "react-native";

const search = () => {
  return (
    <SafeAreaView className="h-full">
      <TextInput
        placeholder="Buscar"
        returnKeyType="search"
        className="w-full px-3 py-2"
      />
    </SafeAreaView>
  );
};

export default search;
