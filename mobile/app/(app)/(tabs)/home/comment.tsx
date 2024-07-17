import React, { useEffect } from "react";
import { useGlobalSearchParams } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "@/components/Global/Themed";
import { CommentInterface } from "@/interfaces/Comment";
import { KeyboardAvoidingView, Platform } from "react-native";
import { CommentBox } from "@/components/Comment/CommentBox";
import { PostLoader } from "@/components/Global/Skeletons";
import { Comment } from "@/components/Comment/Comment";
import { useComments } from "@/hooks/useComments";

const exploreComment = () => {
  const dataString: any = useGlobalSearchParams();
  const comment: CommentInterface = JSON.parse(dataString.data);
  const { loading, comments, getComments } = useComments(comment.id, "res");

  useEffect(() => {
    if (comment.responses.length > 0) getComments();
  }, []);

  return (
    <KeyboardAvoidingView
      className={`${Platform.OS === "ios" ? "pb-20" : null}`}
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={88}
    >
      <SafeAreaView className="h-full flex-col relative">
        <ScrollView>
          <Comment data={comment} />
          <View className="border-b border-gray-100 dark:border-neutral-800 w-ful px-5 py-3">
            <Text className="font-semibold">Respuestas</Text>
          </View>
          <View className="mt-3">
            {loading ? (
              <PostLoader />
            ) : (
              comments?.map((comment) => (
                <Comment key={comment.id} data={comment} />
              ))
            )}
          </View>
        </ScrollView>
        <CommentBox />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default exploreComment;
