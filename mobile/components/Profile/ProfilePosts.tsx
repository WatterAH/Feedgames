import React from "react";
import { PostInterface } from "@/interfaces/Post";
import { Post } from "../Post/Post";
import { Text, View } from "../Global/Themed";
import { ArchiveBoxIcon } from "react-native-heroicons/outline";
import { useColorScheme } from "react-native";

const Empty = ({ name }: { name?: string }) => {
  const iconColor = useColorScheme() == "dark" ? "#777" : "#000";
  return (
    <View className="h-full flex items-center justify-center">
      <ArchiveBoxIcon color={iconColor} size={34} />
      <Text
        className="text-base text-center max-w-xs mt-5"
        style={{ color: "#777" }}
      >
        {name} no ha publicado nada
      </Text>
    </View>
  );
};

interface Props {
  posts: PostInterface[];
  name?: string;
}

export const ProfilePosts: React.FC<Props> = ({ posts, name }) => {
  return posts.length == 0 ? (
    <Empty name={name}></Empty>
  ) : (
    posts.map((post) => <Post data={post} key={post.id} />)
  );
};
