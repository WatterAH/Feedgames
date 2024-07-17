import React from "react";
import { PostInterface } from "@/interfaces/Post";
import { useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "@/components/Global/Themed";
import { Post } from "@/components/Post/Post";
import { PostLoader } from "@/components/Global/Skeletons";
import { Comment } from "@/components/Comment/Comment";
import { CommentBox } from "@/components/Comment/CommentBox";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useComments } from "@/hooks/useComments";

export default function post() {
  const dataString: any = useLocalSearchParams();
  const post: PostInterface = JSON.parse(dataString.data);
  const s = post.comments;
  const { loading, comments, getComments } = useComments(post.id, "comms", s);

  return (
    <KeyboardAvoidingView
      className={`${Platform.OS === "ios" ? "pb-20" : null}`}
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={88}
    >
      <SafeAreaView className="h-full flex-col relative">
        <ScrollView>
          <Post data={post} />
          <View className="border-b border-gray-100 dark:border-neutral-800 w-ful px-5 py-3 z-30">
            <Text className="font-semibold">Respuestas</Text>
          </View>
          {loading ? (
            <View className="mt-4">
              <PostLoader />
            </View>
          ) : (
            comments?.map((comment) => (
              <Comment key={comment.id} data={comment} />
            ))
          )}
        </ScrollView>
        <CommentBox />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
