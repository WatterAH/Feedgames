import React, { useState } from "react";
import { ProfilePicture } from "../Profile/ProfilePicture";
import { useSession } from "@/context/ctx";
import { ScrollView, Text, View } from "../Global/Themed";
import { TextArea } from "./TextArea";
import { Contents } from "./Contents";
import { ContentPreview } from "./ContentPreview";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAvoidingView } from "react-native";
import { Button } from "../Global/Button";

export const Create = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const { user } = useSession();
  return (
    <KeyboardAvoidingView
      className="pb-10"
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={110}
    >
      <ScrollView
        lightColor="#fff"
        darkColor="#181818"
        keyboardShouldPersistTaps="always"
        className="h-10 w-full flex-col"
      >
        <View
          lightColor="#fff"
          darkColor="#181818"
          className="flex-row h-full items-start p-5"
          style={{ columnGap: 12 }}
        >
          <ProfilePicture h="h-11" w="w-11" src={user?.pfp} />
          <View
            lightColor="#fff"
            darkColor="#181818"
            className="flex-col relative"
          >
            <Text style={{ fontWeight: "600" }}>{user?.username}</Text>
            <TextArea placeholder={`¿Qué hay en tu mente ${user?.name}?`} />
            <Contents handlePress={pickImage} />
            <ContentPreview image={image} />
          </View>
        </View>
      </ScrollView>
      <View
        darkColor="#181818"
        className="w-full flex-row justify-end items-end"
      >
        <View darkColor="#181818" className="w-32 p-3">
          <Button style={{ paddingHorizontal: 1 }}>
            <Text className="font-semibold" style={{ color: "#101010" }}>
              Publicar
            </Text>
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
