import React from "react";
import { PostInterface } from "@/interfaces/Post";
import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { PostActions } from "./PostActions";
import { View } from "../Global/Themed";
import { usePathname } from "expo-router";
import { Pressable, TouchableOpacity } from "react-native";
import { goToPost, goToProfile } from "@/functions/navigation";
import { ProfilePicture } from "../Profile/ProfilePicture";

interface Props {
  data: PostInterface;
}

export const Post: React.FC<Props> = ({ data }) => {
  const paramsPost = { id: data.id, username: data.user.username };
  const paramsProfile = { id: data.user_id };
  const pathName = usePathname();
  const handlePressPost = () => goToPost(pathName, paramsPost);
  const handlePressProfile = () => goToProfile(pathName, paramsProfile);

  return (
    <Pressable onPress={handlePressPost}>
      <View
        className="w-full h-fit duration-700 border-b border-gray-100 dark:border-neutral-800 flex-row justify-between py-5 px-3"
        style={{ rowGap: 16 }}
      >
        <TouchableOpacity className="h-10" onPress={handlePressProfile}>
          <ProfilePicture src={data.user.pfp} w={"w-10"} h={"h-10"} />
        </TouchableOpacity>
        <View className="w-full flex-col pl-2 pr-8" style={{ rowGap: 6 }}>
          <PostHeader data={data} />
          <PostContent data={data} />
          <PostActions data={data} />
        </View>
      </View>
    </Pressable>
  );
};
