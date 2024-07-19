import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "@/components/Global/Themed";
import React, { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ProfilePicture } from "@/components/Profile/ProfilePicture";
import { TextArea } from "@/components/Create/TextArea";
import { Contents } from "@/components/Create/Contents";
import { ContentPreview } from "@/components/Create/ContentPreview";
import { useSession } from "@/context/ctx";
import { Button } from "@/components/Global/Button";
import { createPost } from "@/api/post";
import { MatchShowCase } from "@/interfaces/Valorant";
import { router } from "expo-router";

const modal = () => {
  const { user } = useSession();
  const [loading, setLoading] = useState(false);
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [valMatch, setValMatch] = useState<MatchShowCase | null>(null);
  const disabled = postText.trim().length == 0 && !image;

  const clearText = useCallback(() => setPostText(""), []);

  const createNewPost = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      await createPost(user.id, postText, [], valMatch, image);
      router.replace("/");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [postText, image, valMatch, user?.id]);

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
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
  }, []);

  return (
    <SafeAreaView className="h-full flex-col justify-center items-center">
      <KeyboardAvoidingView
        style={{ flex: 1, paddingBottom: Platform.OS === "ios" ? 10 : 0 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 20}
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
              <TextArea
                text={postText}
                clear={clearText}
                value={postText}
                onChangeText={(text) => setPostText(text)}
                placeholder={`¿Qué hay en tu mente ${user?.name}?`}
              />
              <Contents handlePress={pickImage} />
              <ContentPreview image={imagePreview} />
            </View>
          </View>
        </ScrollView>
        <View
          darkColor="#181818"
          className="w-full flex-row justify-end items-end"
        >
          <View darkColor="#181818" className="w-32 p-3">
            <Button
              h="10"
              text="Publicar"
              onPress={createNewPost}
              loading={loading}
              disabled={disabled}
              style={{ paddingHorizontal: 1, opacity: disabled ? 0.5 : 1 }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default modal;
