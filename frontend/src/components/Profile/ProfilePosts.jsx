import React, { useEffect, useState } from "react";
import { Preview } from "../Preview/Preview";
import { toast } from "react-toastify";
import { LoadingPage } from "../LoadingPage";
import { useUser } from "../../context/AuthContext";
import { getProfilePost } from "../../Api/profile";

export const ProfilePosts = ({ userID }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const handlePostsViewer = async () => {
    try {
      setLoading(true);
      const postsFetched = await getProfilePost(userID, user.id);
      setPosts(postsFetched);
    } catch (error) {
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
    <div className={`${loading ? "mt-10" : ""} mb-16`}>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col gap-y-4">
          <h1 className="text-2xl mt-5 font-rubik font-semibold">
            Publicaciones
          </h1>
          <div className="flex flex-wrap gap-4">
            {posts.length !== 0 ? (
              posts.map((post, index) => (
                <Preview
                  key={index}
                  post={post}
                  userID={userID}
                  setPosts={setPosts}
                />
              ))
            ) : (
              <h3 className="text-lg sm:text-xl font-montserrat">
                Este usuario aún no ha publicado nada.
              </h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
