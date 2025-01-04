"use client";
import Title from "@/layout/Pages/Title";
import Card from "@/layout/Pages/Card";
import Error from "@/layout/Pages/Error";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import { useParams } from "next/navigation";
import { useUser } from "@/context/AuthContext";
import { ProfileLoader } from "@/layout/Pages/Loaders";
import { useExploreProfile } from "@/hooks/useExplorer";
import { usePosts } from "@/hooks/usePosts";
import PostContainer from "@/layout/Pages/PostContainer";

export default function ProfilePage() {
  const { id } = useParams();
  const { user } = useUser();
  const userId = id as string;
  const u = useExploreProfile(userId, user.id);
  const p = usePosts(userId, "profile", user.id);

  const RenderContent = () => {
    if (u.loading || p.loading) return <ProfileLoader />;
    if (u.error || p.error) return <Error />;
    if (!u.loading && !p.loading && u.profile)
      return (
        <>
          <ProfileHeader data={u.profile} />
          <PostContainer
            posts={p.posts}
            getPost={p.getPosts}
            hasMore={p.hasMore}
          />
        </>
      );
  };

  return (
    <>
      <Title title="Perfil" />
      <Card />
      <div className="w-full max-w-xl py-14 md:pt-0 md:mt-[11vh] lg:pb-0 z-10">
        <RenderContent />
      </div>
    </>
  );
}
