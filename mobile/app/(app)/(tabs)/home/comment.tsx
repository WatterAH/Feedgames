import React, { useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView } from "@/components/Global/Themed";
import { fetchResponses } from "@/api/comments";
import { useSession } from "@/context/ctx";
import { CommentInterface } from "@/interfaces/Comment";
import { KeyboardAvoidingView, Platform } from "react-native";
import { CommentBox } from "@/components/Comment/CommentBox";
import { PostLoader } from "@/components/Global/Skeletons";
import { Comment } from "@/components/Comment/Comment";

const exploreComment = () => {
  const dataString: any = useGlobalSearchParams();
  const comment: CommentInterface = JSON.parse(dataString.data);
  const { user } = useSession();
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<CommentInterface[]>();

  const getResponses = async () => {
    try {
      setLoading(true);
      if (user?.id) {
        const data = await fetchResponses(comment.id, user.id);
        setResponses(data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (comment.responses.length > 0) getResponses();
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
          {loading ? (
            <PostLoader />
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
