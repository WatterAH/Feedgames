import React, { useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "@/components/Global/Themed";
import { fetchComment, fetchResponses } from "@/api/comments";
import { useSession } from "@/context/ctx";
import {
  CommentInterface,
  defaultComment as defComment,
} from "@/interfaces/Comment";
import { KeyboardAvoidingView, Platform } from "react-native";
import { CommentBox } from "@/components/Comment/CommentBox";
import { PostLoader } from "@/components/Global/Skeletons";
import { Comment } from "@/components/Comment/Comment";

const exploreComment = () => {
  const { id, username } = useGlobalSearchParams();
  const { user } = useSession();
  const [loadingComm, setLoadingComm] = useState(false);
  const [loadingRes, setLoadingRes] = useState(false);
  const [comment, setComment] = useState<CommentInterface>(defComment);
  const [responses, setResponses] = useState<CommentInterface[]>();

  const getComment = async () => {
    try {
      setLoadingComm(true);
      if (user?.id) {
        const data = await fetchComment(id as string, user.id);
        if (data) setComment(data);
      }
    } catch (error) {
    } finally {
      setLoadingComm(false);
    }
  };

  const getResponses = async () => {
    try {
      setLoadingRes(true);
      if (user?.id) {
        const data = await fetchResponses(id as string, user.id);
        setResponses(data);
      }
    } catch (error) {
    } finally {
      setLoadingRes(false);
    }
  };

  useEffect(() => {
    getComment();
    getResponses();
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
          {loadingComm ? <PostLoader /> : <Comment data={comment} />}
          <View className="border-b border-gray-100 dark:border-neutral-800 w-ful px-5 py-3">
            <Text className="font-semibold">Respuestas</Text>
          </View>
          {loadingRes ? (
            <View className="mt-4">
              <PostLoader />
            </View>
          ) : (
            responses?.map((response) => (
              <Comment key={response.id} data={response} />
            ))
          )}
        </ScrollView>
        <CommentBox />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default exploreComment;
