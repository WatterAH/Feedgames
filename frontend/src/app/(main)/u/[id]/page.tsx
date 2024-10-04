"use client";
import Card from "@/components/Global/Card";
import PageLoader from "@/components/Global/PageLoader";
import PostsContainer from "@/components/Post/PostsContainer";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import { useExploreProfile } from "@/hooks/useExplorer";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { id } = useParams();
  const { profile, posts, loading, error } = useExploreProfile(id as string);

  return (
    <main className="flex flex-col lg:ml-20 h-screen justify-center items-center  bg-barcelona sm:pt-1 md:pt-4 gap-y-3">
      <h3 className="font-semibold text-threads hidden md:block">Perfil</h3>
      <Card loading={loading}>
        {loading && <PageLoader />}
        {error && <h1>Error</h1>}
        {!loading && !error && (
          <div className="overflow-y-auto scrollbar-none pb-14">
            {profile && <ProfileHeader data={profile} />}
            <div className="w-full h-fit flex flex-col">
              <PostsContainer posts={posts} />
            </div>
          </div>
        )}
      </Card>
    </main>
  );
}
