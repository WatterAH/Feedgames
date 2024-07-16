import React, { useEffect, useState } from "react";
import { PostInterface, defaultPost } from "@/interfaces/Post";
import { useGlobalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView } from "@/components/Global/Themed";
import { Post } from "@/components/Post/Post";
import { getPostById } from "@/api/post";
import { useSession } from "@/context/ctx";
import { PostLoader } from "@/components/Global/Skeletons";
import { fetchComments } from "@/api/comments";
import { CommentInterface } from "@/interfaces/Comment";
import { Comment } from "@/components/Comment/Comment";
import { CommentBox } from "@/components/Comment/CommentBox";
import { KeyboardAvoidingView, Platform } from "react-native";

const post = () => {
  const { id } = useGlobalSearchParams();
  const { user } = useSession();
  const [loadingPost, setLoadingPost] = useState(false);
  const [post, setPost] = useState<PostInterface>(defaultPost);
  const [loadingComm, setLoadingComm] = useState(false);
  const [comments, setComments] = useState<CommentInterface[]>();

  const getPost = async () => {
    try {
      setLoadingPost(true);
      if (user?.id) {
        const data = await getPostById(id as string, user.id);
        if (data) setPost(data);
      }
    } catch (error) {
    } finally {
      setLoadingPost(false);
    }
  };

  const getComments = async () => {
    try {
      setLoadingComm(true);
      if (user?.id) {
        const data = await fetchComments(id as string, user.id);
        setComments(data);
      }
    } catch (error) {
    } finally {
      setLoadingComm(false);
    }
  };

  useEffect(() => {
    getPost();
    getComments();
  }, []);

  return (
    <KeyboardAvoidingView
      className={`${Platform.OS === "ios" ? "pb-20" : null}`}
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={88}
    >
      <SafeAreaView className="h-full flex-col relative">
        <ScrollView className="">
          {loadingPost ? <PostLoader /> : <Post data={post} />}
          {loadingComm ? (
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
