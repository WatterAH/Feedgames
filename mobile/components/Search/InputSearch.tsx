import React, { useState } from "react";
import { Keyboard, Pressable, TextInput, useColorScheme } from "react-native";
import { Text, View } from "../Global/Themed";
import { MagnifyingGlassIcon, XCircleIcon } from "react-native-heroicons/solid";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { router } from "expo-router";

interface Props {
  focus: boolean;
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
}

export const InputSearch: React.FC<Props> = ({
  focus,
  setFocus,
  setText,
  text,
}) => {
  const backgroundColor = useColorScheme() === "dark" ? "#202020" : "#ebebeb";
  const width = useSharedValue(380);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInput = () => {
    if (focus) {
      width.value = withSpring(380);
      setFocus(!focus);
    } else {
      width.value = withSpring(310);
      setFocus(!focus);
    }
  };

  const handleDelete = () => {
    setText("");
    setSearchTerm("");
  };

  const handleSubmit = () => {
    router.push({ pathname: "/search/results", params: { searchTerm } });
  };

  return (
    <View
      className="flex-row items-center px-4 relative h-16 border-b border-light-gray dark:border-dark-gray"
      style={{ columnGap: 8 }}
    >
      <View
        className="absolute left-7 z-20 flex items-center justify-center"
        darkColor="transparent"
        lightColor="transparent"
      >
        <MagnifyingGlassIcon size={18} color="#777" />
      </View>
      <Animated.View style={{ width, position: "relative" }}>
        <TextInput
          className="rounded-xl h-10 pl-9 z-10 text-gray-700 dark:text-gray-200"
          onFocus={handleInput}
          onBlur={handleInput}
          onChangeText={(text) => {
            setText(text);
            setSearchTerm(text);
          }}
          value={text}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
          cursorColor="#777"
          placeholder="Buscar"
          placeholderTextColor={"#777"}
          style={{ backgroundColor }}
        />
        <Pressable
          onPress={handleDelete}
          className="absolute right-2 top-2 z-20"
        >
          <XCircleIcon size={26} color="#777" />
        </Pressable>
      </Animated.View>
      {focus && (
        <Pressable onPress={() => Keyboard.dismiss()}>
          <Text>Cancelar</Text>
        </Pressable>
      )}
    </View>
  );
};
