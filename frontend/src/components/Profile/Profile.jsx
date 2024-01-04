import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { LoadingPage } from "../LoadingPage";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileDescription } from "./ProfileDescription";
import { ProfilePosts } from "./ProfilePosts";
import { displayContent } from "../../home/Home";
import { useUser } from "../../context/AuthContext";
import { getProfile } from "../../Api/profile";
import { NotFound } from "../NotFound";

export const Profile = ({ id }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [forceUpdate, setForceUpdate] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleProfileViewer = async () => {
    try {
      if (user.id == id) {
        displayContent("Profile");
      }
      setLoading(true);
      const userFetched = await getProfile(id, user.id);
      if (!userFetched) {
        return setNotFound(true);
      }
      setUserData(userFetched);
    } catch (error) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.id) {
      handleProfileViewer();
    }
  }, [id, user.id, forceUpdate]);

  return (
    <div
      className={`flex flex-col items-center ${
        loading ? "justify-center" : ""
      } h-screen`}
    >
      {loading ? (
        <LoadingPage />
      ) : notFound ? (
        <NotFound title={"perfil"} />
      ) : userData.username ? (
        <div className="flex flex-col w-full px-2 py-4">
          <div className="flex flex-col w-full border-b gap-4">
            <section className="flex">
              <ProfileHeader
                userData={userData}
                setForceUpdate={setForceUpdate}
              />
            </section>
            <ProfileDescription userData={userData} />
          </div>
          <ProfilePosts userID={userData.id} />
        </div>
      ) : null}
    </div>
  );
};
