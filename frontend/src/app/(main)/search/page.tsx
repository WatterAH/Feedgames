"use client";
import Post from "@/components/Post/Post";
import Title from "@/layout/Pages/Title";
import Error from "@/layout/Pages/Error";
import Card from "@/layout/Pages/Card";
import InputSearch from "@/layout/Search/InputSearch";
import { useUser } from "@/context/AuthContext";
import { PostsLoader } from "@/layout/Pages/Loaders";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTendency } from "@/store/tendencySlice";
import { useSearchPosts, useSearchUsers } from "@/hooks/useExplorer";
import { RenderPosts, RenderUsers } from "@/layout/Search/Render";
import SearchCurrent from "@/layout/Search/SearchCurrent";

export default function SearchPage() {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [current, setCurrent] = useState("");
  const { resultsUsers, errorUsers, loadUsers } = useSearchUsers(
    searchTerm,
    setCurrent,
    user?.id
  );
  const { resultsPosts, errorPosts, loadPosts } = useSearchPosts(
    current,
    user.id
  );
  const dispatch: AppDispatch = useDispatch();

  const { posts, error, loading } = useSelector(
    (state: RootState) => state.tendency
  );

  useEffect(() => {
    if (user?.id && posts.length == 0) dispatch(fetchTendency(user.id));
  }, [dispatch, user?.id, posts.length]);

  const RenderContent = () => {
    if (loading) return <PostsLoader count={4} />;
    if (error || errorUsers || errorPosts) return <Error />;

    if (searchTerm.trim().length == 0) {
      return posts.map((post) => <Post data={post} key={post.id} />);
    } else if (current.length == 0) {
      return (
        <div>
          <SearchCurrent setCurrent={setCurrent} searchTerm={searchTerm} />
          <RenderUsers loading={loadUsers} users={resultsUsers} />
        </div>
      );
    } else {
      return <RenderPosts loading={loadPosts} posts={resultsPosts} />;
    }
  };

  return (
    <>
      <Title title="Buscar" />
      <Card />
      <div className="w-full max-w-2xl pt-20 pb-14 md:pt-3 md:mt-[11vh] lg:pb-0 z-10">
        <header className="w-full px-5 space-y-3 mb-3">
          <InputSearch
            searchTerm={searchTerm}
            onChange={setSearchTerm}
            setCurrent={setCurrent}
          />
          {searchTerm.trim().length == 0 && (
            <h4 className="text-gray-500 px-2">En tendencia</h4>
          )}
        </header>
        <RenderContent />
      </div>
    </>
  );
}
