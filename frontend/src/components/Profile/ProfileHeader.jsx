import React, { useState } from "react";
import { ProfileFollows } from "./ProfileFollows";
import { ProfileFollowers } from "./ProfileFollowers";
import { ProfileName } from "./ProfileName";
import { FollowButton } from "./FollowButton";
import { useUser } from "../../context/AuthContext";
import { Options } from "./Options";
import { Modal } from "./Modal";
import { ShareButton } from "../Post/ShareButton";
import { ToastContainer } from "react-toastify";
import { ProfilePicture } from "./ProfilePicture";

export const ProfileHeader = ({ userData }) => {
  const text = "¡Mira este perfil en Feedgames!";
  const { id, username, name, pfp } = userData;
  const { user } = useUser();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <header className="flex flex-col w-full sm:flex-row sm:justify-between gap-y-4">
        <section className="flex gap-x-3 justify-between items-center">
          <span className="flex items-center gap-2">
            <ProfilePicture src={pfp} size={"14"} />
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-montserrat font-semibold">
              {username}
            </h1>
          </span>
          <span className="flex items-center gap-x-3">
            <ShareButton
              shareData={{ id, title: username, text, content: "profile" }}
            />
            {user.id == id ? <Options openModal={openModal} /> : null}
          </span>
          <Modal data={{ openModal, closeModal, isOpen, userData }} />
        </section>
        <section className="flex items-center gap-x-3">
          <ProfileName name={name} />
          <ProfileFollowers userData={userData} />
          <ProfileFollows userData={userData} />
          {user.id == id ? null : <FollowButton userData={userData} />}
        </section>
      </header>
      <ToastContainer />
    </>
  );
};
