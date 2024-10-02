"use client";
import PageLoader from "@/components/Global/PageLoader";
import PostsContainer from "@/components/Post/PostsContainer";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import { useProfile } from "@/hooks/useProfile";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { id } = useParams();
  const { profile, posts, loading, error } = useProfile(id as string);

  return (
    <>
      {loading && (
        <main className="flex items-center justify-center h-screen bg-barcelona">
          <PageLoader />
        </main>
      )}
      {error && (
        <main className="flex items-center justify-center h-screen bg-barcelona">
          <h1>Error</h1>
        </main>
      )}
      {!loading && !error && (
        <main className="flex flex-col lg:ml-20 h-screen justify-center items-center sm:pt-3 lg:pt-7 bg-barcelona">
          <div className="flex flex-col lg:pt-2 bg-white sm:rounded-t-3xl sm:shadow-md border h-screen max-w-2xl w-full overflow-y-auto scrollbar-none">
            {profile && <ProfileHeader data={profile} />}
            <div className="w-full flex flex-col">
              <PostsContainer posts={posts} />
            </div>
          </div>
        </main>
      )}
    </>
  );
}
