import React from "react";
import { PostInterface } from "@/interfaces/Post";
import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { PostActions } from "./PostActions";
import { View } from "../Global/Themed";
import { router, usePathname } from "expo-router";
import { Pressable } from "react-native";

interface Props {
  data: PostInterface;
}

export const Post: React.FC<Props> = ({ data }) => {
  const params = { id: data.id, username: data.user.username };
  const pathName = usePathname();

  const handlePress = () => {
    switch (pathName) {
      case "/home":
        return router.push({ pathname: "/home/post", params });
      case "/home/profile":
        return router.push({ pathname: "/home/post", params });
      default:
        break;
    }
  };

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
