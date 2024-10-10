"use client";
import Title from "@/layout/Pages/Title";
import Card from "@/layout/Pages/Card";
import Error from "@/layout/Pages/Error";
import PostContainer from "@/layout/Pages/PostContainer";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import { useParams } from "next/navigation";
import { usePosts } from "@/hooks/usePosts";
import { useUser } from "@/context/AuthContext";
import { ProfileLoader } from "@/layout/Pages/Loaders";
import { useExploreProfile } from "@/hooks/useExplorer";

export default function ProfilePage() {
  const { id } = useParams();
  const { user } = useUser();
  const userId = id as string;
  const userData = useExploreProfile(userId, user.id);
  const postsData = usePosts(userId, "profile", user.id);
  const { profile, loading: loadU, error: errorU } = userData;
  const { posts, hasMore, getPosts, error: errP } = postsData;

  return (
    <main className="flex flex-col h-screen items-center bg-barcelona relative">
      <Title title="Perfil" />
      <Card />
      <div className="w-full max-w-2xl md:mt-[10vh] pb-14 lg:pb-0 z-10">
        {loadU && <ProfileLoader />}
        {(errorU || errP) && <Error />}
        {profile && (
          <>
            <ProfileHeader data={profile} />
            <PostContainer posts={posts} hasMore={hasMore} getPost={getPosts} />
          </>
        )}
      </div>
    </main>
  );
}
