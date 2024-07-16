import React, { useEffect, useState } from "react";
import { PostInterface } from "@/interfaces/Post";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView } from "@/components/Global/Themed";
import { Post } from "@/components/Post/Post";
import { useSession } from "@/context/ctx";
import { PostLoader } from "@/components/Global/Skeletons";
import { fetchComments } from "@/api/comments";
import { CommentInterface } from "@/interfaces/Comment";
import { Comment } from "@/components/Comment/Comment";
import { CommentBox } from "@/components/Comment/CommentBox";
import { KeyboardAvoidingView, Platform } from "react-native";

const post = () => {
  const dataString: any = useLocalSearchParams();
  const post: PostInterface = JSON.parse(dataString.data);
  const { user } = useSession();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<CommentInterface[]>();

  const getComments = async () => {
    try {
      setLoading(true);
      if (user?.id) {
        const data = await fetchComments(post.id as string, user.id);
        setComments(data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (post.comments !== 0) {
      getComments();
    }
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
          <Post data={post} />
          {loading ? (
            <PostLoader />
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
};

export default post;
