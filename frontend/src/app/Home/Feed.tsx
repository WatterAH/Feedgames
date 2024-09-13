import { useCallback, useEffect, useState } from "react";
import { useUser } from "../../context/AuthContext";
import { useFeed } from "../../hooks/useFeed";
import PostsContainer from "../../components/Global/PostsContainer";
import PageLoader from "../../components/Global/PageLoader";
import Suggestions from "../../components/Suggestions/Suggestions";
import Notes from "../../components/Notes/Notes";

const Feed = () => {
  const { user } = useUser();
  const [page, setPage] = useState(0);
  const { posts, loading, error } = useFeed(user.id, page);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      {loading && (
        <main className="flex items-center justify-center h-screen lg:ml-64">
          <PageLoader />
        </main>
      )}
      {error && <></>}
      {!loading && !error && (
        <>
          <main className="flex w-full h-full justify-center items-center lg:justify-normal 3xl:justify-center">
            <div className="flex flex-1 flex-col gap-y-5 max-w-xl w-full lg:ml-80">
              <Notes />
              <PostsContainer posts={posts} />
            </div>
          </main>
          <Suggestions />
        </>
      )}
    </>
  );
};

export default Feed;
