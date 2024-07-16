import React, { useCallback } from "react";
import { PostInterface } from "@/interfaces/Post";
import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { PostActions } from "./PostActions";
import { View } from "../Global/Themed";
import { usePathname } from "expo-router";
import { ProfilePicture } from "../Profile/ProfilePicture";
import { TouchableOpacity } from "react-native";
import { goToPost, goToProfile } from "@/functions/navigation";

interface Props {
  data: PostInterface;
}

export const Post: React.FC<Props> = React.memo(({ data }) => {
  const pathName = usePathname();
  const mainPath = pathName.split("/")[1];

  const handlePostPress = useCallback(() => {
    goToPost(mainPath, { data: JSON.stringify(data) });
  }, [mainPath, data]);

  const handleProfilePress = useCallback(() => {
    goToProfile(mainPath, { id: data.user_id });
  }, [mainPath, data.user_id]);

  return (
    <TouchableOpacity
      className="w-full border-b border-gray-100 dark:border-neutral-800 flex-row justify-between py-5 px-3 z-50"
      onPress={handlePostPress}
      activeOpacity={1}
      style={{ rowGap: 16 }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleProfilePress}
        className="h-10"
      >
        <ProfilePicture src={data.user.pfp} w={"w-10"} h={"h-10"} />
      </TouchableOpacity>
      <View className="w-full flex-col ml-2 pr-11" style={{ rowGap: 6 }}>
        <PostHeader data={data} />
        <PostContent data={data} />
        <PostActions data={data} />
      </View>
    </TouchableOpacity>
  );
});
