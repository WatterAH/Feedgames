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

export const ProfileHeader = ({ userData, setForceUpdate }) => {
  const text = "¡Mira este perfil en Feedgames!";
  const { id, username, name } = userData;
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
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-montserrat font-semibold">
            {username}
          </h1>
          <span className="flex items-center gap-x-3">
            <ShareButton
              shareData={{ id, title: username, text, content: "Profile" }}
            />
            {user.id == id ? (
              <Options openModal={openModal} setForceUpdate={setForceUpdate} />
            ) : null}
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
