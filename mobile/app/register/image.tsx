import React, { useState } from "react";
import { SafeAreaView, Text, View } from "@/components/Global/Themed";
import * as ImagePicker from "expo-image-picker";
import { Image, Pressable } from "react-native";
import { PhotoIcon } from "react-native-heroicons/outline";
import { Button } from "@/components/Global/Button";

const image = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-col h-full items-center justify-start">
      <View
        className="flex-col items-center gap-y-4 w-full px-5 mt-5"
        style={{ rowGap: 6 }}
      >
        <Text className="text-xl p-3 text-center font-bold">
          Dale vida a tu perfil con una imagen
        </Text>
        <Pressable onPress={pickImage}>
          <PhotoIcon color={"#777777"} size={32} />
        </Pressable>
        <View
          lightColor="#b5b5b5"
          darkColor="#202020"
          className="w-44 h-44 rounded-full"
        >
          {image && (
            <Image source={{ uri: image }} className="w-44 h-44 rounded-full" />
          )}
        </View>
        <View className="w-1/2">
          <Button>
            <Text className="text-white dark:text-black">Todo listo</Text>
          </Button>
        </View>
        <Text className="text-xs font-semibold">Quizá más tarde</Text>
      </View>
    </SafeAreaView>
  );
};

export default image;
