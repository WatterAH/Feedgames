import React from "react";
import { PostInterface } from "@/interfaces/Post";
import { Post } from "../Post/Post";
import { Text, View } from "../Global/Themed";
import { ArchiveBoxIcon, InboxIcon } from "react-native-heroicons/outline";
import { Empty } from "../Global/Empty";

interface Props {
  posts: PostInterface[];
  name?: string;
}

export const ProfilePosts: React.FC<Props> = React.memo(({ posts, name }) => {
  return posts.length == 0 ? (
    <View
      className="flex h-full items-center justify-center"
      style={{ rowGap: 16 }}
    >
      <InboxIcon size={50} color={"#777"} />
      <Empty text="No hay publicaciones" />
    </View>
  ) : (
    posts.map((post) => <Post data={post} key={post.id} />)
  );
});
