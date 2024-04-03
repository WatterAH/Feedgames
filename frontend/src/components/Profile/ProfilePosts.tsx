import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LoadingPage } from "../LoadingPage";
import { useUser } from "../../Context/AuthContext";
import { getProfilePost } from "../../api/profile";
import { MapPost } from "../../Home/MapPost";
import { PostInterface } from "../../interfaces/Post";

interface Props {
  userID: string;
}

export const ProfilePosts: React.FC<Props> = ({ userID }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);

  const handlePostsViewer = async () => {
    try {
      setLoading(true);
      const postsFetched = await getProfilePost(userID, user.id);
      setPosts(postsFetched);
    } catch (error: any) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePostsViewer();
  }, [userID]);

  return (
    <div className={`${loading ? "mt-10" : ""}`}>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col gap-y-4 justify-center">
          <div className="flex flex-col w-full max-w-xl mx-auto gap-3">
            {posts.length !== 0 ? (
              <MapPost posts={posts} loading={loading} setPosts={setPosts} />
            ) : (
              <h3 className="text-lg sm:text-xl font-montserrat text-center p-3">
                Este usuario aún no ha publicado nada.
              </h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
