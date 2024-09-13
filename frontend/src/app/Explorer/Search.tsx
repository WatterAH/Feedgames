import Input from "../../components/Global/Input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePosts } from "../../hooks/usePosts";
import { useUser } from "../../context/AuthContext";
import PageLoader from "../../components/Global/PageLoader";
import PostsContainer from "../../components/Global/PostsContainer";

const Search = () => {
  const { user } = useUser();
  const { posts, loading, error } = usePosts(user.id, "tendency");
  console.log(posts);

  return (
    <main className="flex flex-col lg:ml-64 items-center">
      <header className="flex flex-row items-center w-full gap-x-2 p-3 max-w-xl">
        <MagnifyingGlassIcon className="text-neutral-800 h-8" />
        <Input placeholder="Busca personas, posts..." />
      </header>
      <h1 className="p-3 text-xl font-semibold">En tendencia</h1>
      {loading && (
        <div className="mt-10">
          <PageLoader />
        </div>
      )}
      {error && <></>}
      {!loading && !error && (
        <div className="flex w-full max-w-xl">
          <PostsContainer posts={posts} />
        </div>
      )}
    </main>
  );
};

export default Search;
