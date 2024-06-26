import React from "react";
import { PostInterface } from "@/interfaces/Post";
import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { PostActions } from "./PostActions";
import { View } from "../Global/Themed";
import { usePathname } from "expo-router";
import { Pressable } from "react-native";
import { goToPost } from "@/functions/navigation";

interface Props {
  data: PostInterface;
}

export const Post: React.FC<Props> = ({ data }) => {
  const params = { id: data.id, username: data.user.username };
  const pathName = usePathname();
  const handlePress = () => goToPost(pathName, params);

  return (
    <Pressable onPress={handlePress}>
      <View
        className="w-full duration-700 border-b border-gray-100 dark:border-neutral-800 flex-col py-5 px-3"
        style={{ rowGap: 16 }}
      >
        <PostHeader data={data} />
        <PostContent data={data} />
        <PostActions data={data} />
      </View>
    </Pressable>
  );
};
