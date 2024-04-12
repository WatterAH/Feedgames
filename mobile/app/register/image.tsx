import React, { useState } from "react";
import { SafeAreaView, Text, View } from "@/components/Global/Themed";
import * as ImagePicker from "expo-image-picker";
import { Image, Pressable, useColorScheme } from "react-native";
import { PhotoIcon, XMarkIcon } from "react-native-heroicons/outline";
import { Button } from "@/components/Global/Button";
import { router, useGlobalSearchParams } from "expo-router";
import { registerApi } from "@/api/auth";
import { useSession } from "@/context/ctx";

const image = () => {
  const {
    name,
    username,
    details,
    password,
  }: { name: string; username: string; details: string; password: string } =
    useGlobalSearchParams();
  const { login } = useSession();
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#202020" : "#fff";
  const circelColor = colorScheme === "dark" ? "#eaeaea" : "#000";
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      const asset = result.assets[0];
      setImage(asset);
      setImagePreview(asset.uri);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = image
        ? await registerApi(name, username, details, password, image)
        : await registerApi(name, username, details, password);
      const { user, token } = data;
      login(user, token);
      router.replace("/");
    } catch (error: any) {
      const { message } = error;
      setError(message);
    } finally {
      setLoading(false);
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
          lightColor="#eaeaea"
          darkColor="#202020"
          className="w-44 h-44 rounded-full relative"
        >
          {imagePreview && (
            <>
              <Image
                source={{ uri: imagePreview }}
                className="w-44 h-44 rounded-full"
              />
              <Pressable
                className="absolute right-4 h-7 w-7 items-center justify-center rounded-full"
                style={{ backgroundColor: circelColor }}
                onPress={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
              >
                <XMarkIcon color={iconColor} size={20} />
              </Pressable>
            </>
          )}
        </View>
        <View className="w-1/2">
          <Button
            onPress={handleSubmit}
            h="12"
            loading={loading}
            text="Todo listo"
          ></Button>
        </View>
        <Text className="text-xs font-semibold" onPress={handleSubmit}>
          Quizá más tarde
        </Text>
        <Text className="text-red-500">{error}</Text>
      </View>
    </SafeAreaView>
  );
};

export default image;
