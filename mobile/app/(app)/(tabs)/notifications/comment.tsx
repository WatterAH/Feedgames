import React, { useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView } from "@/components/Global/Themed";
import { fetchComment, fetchResponses } from "@/api/comments";
import { useSession } from "@/context/ctx";
import {
  CommentInterface,
  defaultComment as defComment,
} from "@/interfaces/Comment";
import { KeyboardAvoidingView } from "react-native";
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
      className="pb-20"
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={87}
    >
      <SafeAreaView className="h-full flex-col relative">
        <ScrollView>
          {loadingComm ? <PostLoader /> : <Comment data={comment} />}
          {loadingRes ? (
            <PostLoader />
          ) : (
            responses?.map((response) => (
              <Comment key={response.id} data={response} />
            ))
          )}
        </ScrollView>
        <CommentBox username={username as string} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default exploreComment;
