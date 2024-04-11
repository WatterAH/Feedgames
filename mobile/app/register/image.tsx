import React, { useState } from "react";
import { SafeAreaView, Text, View } from "@/components/Global/Themed";
import * as ImagePicker from "expo-image-picker";
import { Image, Pressable } from "react-native";
import { PhotoIcon } from "react-native-heroicons/outline";
import { Button } from "@/components/Global/Button";
import { useGlobalSearchParams } from "expo-router";
import { registerApi } from "@/api/auth";

interface Params {
  name: string;
  username: string;
  details: string;
  password: string;
}

const image = () => {
  const { name, username, details, password } = useGlobalSearchParams();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      const asset = result.assets[0];
      const uriParts = asset.uri.split(".");
      const fileType = uriParts[uriParts.length - 1];
      setImagePreview(asset.uri);
    }
  };

  const handleSubmit = async (imagePicked: boolean) => {
    try {
      if (imagePicked) {
        const data = await registerApi(
          name as string,
          username as string,
          details as string,
          password as string,
          image
        );
      }
    } catch (error) {}
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
          {imagePreview && (
            <Image
              source={{ uri: imagePreview }}
              className="w-44 h-44 rounded-full"
            />
          )}
        </View>
        <View className="w-1/2">
          <Button
            onPress={() => handleSubmit(true)}
            h="12"
            loading={false}
            text="Todo listo"
          >
            <Text className="text-white dark:text-black">Todo listo</Text>
          </Button>
        </View>
        <Text className="text-xs font-semibold">Quizá más tarde</Text>
      </View>
    </SafeAreaView>
  );
};

export default image;
