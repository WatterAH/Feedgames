import React from "react";
import { ProfilePicture } from "../Profile/ProfilePicture";
import { useSession } from "@/context/ctx";
import { ScrollView, Text, View } from "../Global/Themed";
import { TextArea } from "../Global/TextArea";
import { Contents } from "./Contents";

export const Create = () => {
  const { user } = useSession();
  return (
    <ScrollView className="h-full w-full flex-col p-5">
      <View className="flex-row items-start" style={{ columnGap: 12 }}>
        <ProfilePicture h="h-11" w="w-11" src={user?.pfp} />
        <View className="flex-col relative">
          <Text style={{ fontWeight: "600" }}>{user?.username}</Text>
          <TextArea placeholder={`¿Qué hay en tu mente ${user?.name}?`} />
          <Contents />
        </View>
      </View>
    </ScrollView>
  );
};
