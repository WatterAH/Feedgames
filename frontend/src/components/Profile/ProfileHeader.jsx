import React, { useState } from "react";
import { ProfileFollows } from "./ProfileFollows";
import { ProfileFollowers } from "./ProfileFollowers";
import { ProfileName } from "./ProfileName";
import { FollowButton } from "./FollowButton";
import { useUser } from "../../context/AuthContext";
import { Options } from "./Options";
import { Modal } from "./Modal";

export const ProfileHeader = ({ userData, setForceUpdate }) => {
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
    <header className="flex flex-col w-full sm:flex-row sm:justify-between gap-y-4">
      <section className="flex gap-x-3 justify-between items-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-montserrat font-semibold">
          {username}
        </h1>
        {user.id == id ? (
          <Options openModal={openModal} setForceUpdate={setForceUpdate} />
        ) : null}
        <Modal data={{ openModal, closeModal, isOpen, userData }} />
      </section>
      <section className="flex items-center gap-x-3">
        <ProfileName name={name} />
        <ProfileFollowers userData={userData} />
        <ProfileFollows userData={userData} />
        {user.id == id ? null : <FollowButton userData={userData} />}
      </section>
    </header>
  );
};
