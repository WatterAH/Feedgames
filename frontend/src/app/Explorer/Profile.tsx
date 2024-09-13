import { useParams } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import PostsContainer from "../../components/Global/PostsContainer";
import PageLoader from "../../components/Global/PageLoader";

const Profile = () => {
  const { id } = useParams();
  const { profile, posts, loading, error } = useProfile(id);

  return (
    <>
      {loading && (
        <main className="flex items-center justify-center h-screen lg:ml-64">
          <PageLoader />
        </main>
      )}
      {error && <></>}
      {!loading && !error && (
        <main className="flex flex-col h-full justify-center items-center lg:ml-64">
          {profile && <ProfileHeader data={profile} />}
          <div className="w-full flex flex-col max-w-xl">
            <PostsContainer posts={posts} />
          </div>
        </main>
      )}
    </>
  );
};

export default Profile;
