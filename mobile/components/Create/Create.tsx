import React from "react";
import { ProfilePicture } from "../Profile/ProfilePicture";
import { useSession } from "@/context/ctx";
import { ScrollView, Text, View } from "../Global/Themed";
import { TextArea } from "./TextArea";
import { Contents } from "./Contents";
import { Header } from "./Header";

export const Create = () => {
  const { user } = useSession();
  return (
    <ScrollView
      lightColor="#fff"
      darkColor="#181818"
      keyboardShouldPersistTaps="always"
      className="h-full w-full flex-col"
    >
      <Header />
      <View
        lightColor="#fff"
        darkColor="#181818"
        className="flex-row items-start p-5"
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
          <Contents />
        </View>
      </View>
    </ScrollView>
  );
};
