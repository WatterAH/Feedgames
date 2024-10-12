"use client";
import Post from "@/components/Post/Post";
import Title from "@/layout/Pages/Title";
import Error from "@/layout/Pages/Error";
import Card from "@/layout/Pages/Card";
import { Search } from "lucide-react";
import { useUser } from "@/context/AuthContext";
import { PostsLoader } from "@/layout/Pages/Loaders";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTendency } from "@/store/tendencySlice";

export default function SearchPage() {
  const { user } = useUser();
  const dispatch: AppDispatch = useDispatch();
  const { posts, error, loading } = useSelector(
    (state: RootState) => state.tendency
  );

  useEffect(() => {
    if (user?.id && posts.length == 0) dispatch(fetchTendency(user.id));
  }, [dispatch, user?.id, posts.length]);

  const RenderContent = () => {
    if (loading) return <PostsLoader count={4} />;
    if (error) return <Error />;
    return posts.map((post) => <Post data={post} key={post.id} />);
  };

  return (
    <main className="flex flex-col h-screen justify-start items-center bg-barcelona relative">
      <Title title="Buscar" />
      <Card />
      <div className="w-full max-w-2xl mt-4 md:mt-[13vh] pb-14 lg:pb-0 z-10">
        <header className="w-full px-5 space-y-3 mb-3">
          <div className="relative">
            <Search className="text-icon h-5 absolute top-4 left-3" />
            <input
              type="text"
              className="p-3 lg:py-4 font-montserrat text-base sm:text-sm pl-12 outline-none border rounded-2xl w-full bg-barcelona placeholder-icon text-threads"
              placeholder="Busca personas, posts..."
            />
          </div>
          <h4 className="text-gray-500 px-2">En tendencia</h4>
        </header>
        <RenderContent />
      </div>
    </main>
  );
}
