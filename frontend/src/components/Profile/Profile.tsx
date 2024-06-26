import React, { useEffect, useState } from "react";
import { LoadingPage } from "../LoadingPage";
import { ProfileHeader } from "./ProfileHeader";
import { ProfilePosts } from "./ProfilePosts";
import { useUser } from "../../context/AuthContext";
import { getProfile } from "../../Api/profile";
import { NotFound } from "../NotFound";
import { User, defaultUser } from "../../interfaces/User";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const Profile = () => {
  const { user } = useUser();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<User>(defaultUser);
  const [notFound, setNotFound] = useState(false);

  const handleProfileViewer = async () => {
    try {
      setLoading(true);
      const userFetched = await getProfile(id as string, user.id);
      if (!userFetched) {
        return setNotFound(true);
      }
      setUserData(userFetched);
    } catch (error: any) {
      const { message } = error;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.id) {
      handleProfileViewer();
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id, user.id]);

  return (
    <div
      className={`flex flex-col lg:ml-64 transition-transform duration-700 items-center ${
        loading ? "justify-center" : null
      } h-screen w-full`}
    >
      {loading ? (
        <LoadingPage />
      ) : notFound ? (
        <NotFound title={"perfil"} />
      ) : userData.username ? (
        <div className="flex flex-col w-full dark:bg-black">
          <div className="flex flex-col w-full border-b dark:border-neutral-800 gap-4">
            <section className="flex">
              <ProfileHeader userData={userData} />
            </section>
            <section>
              <p className="font-montserrat text-xs sm:text-sm md:text-base text-gray-600 dark:text-white mb-5 px-3">
                {userData.details}
              </p>
            </section>
          </div>
          <ProfilePosts userID={userData.id} />
        </div>
      ) : null}
    </div>
  );
};
