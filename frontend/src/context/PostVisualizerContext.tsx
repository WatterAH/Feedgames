import React from "react";
import { PostInterface } from "@/interfaces/Post";

interface PostVisualizerContextProps {
  post: PostInterface | null;
  setPost: (post: PostInterface) => void;
}

const defaultPostVisualizerContext: PostVisualizerContextProps = {
  post: null,
  setPost: () => {},
};

export const PostVisualizerContext = React.createContext(
  defaultPostVisualizerContext
);

export const PostVisualizerProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [post, setPost] = React.useState<PostInterface | null>(null);

  return (
    <PostVisualizerContext.Provider value={{ post, setPost }}>
      {children}
    </PostVisualizerContext.Provider>
  );
};

export const usePostVisualizer = () => {
  return React.useContext(PostVisualizerContext);
};
