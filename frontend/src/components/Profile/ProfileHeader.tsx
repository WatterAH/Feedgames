import React, { useState } from "react";
import { ProfileFollows } from "./ProfileFollows";
import { ProfileFollowers } from "./ProfileFollowers";
import { FollowButton } from "./FollowButton";
import { useUser } from "../../Context/AuthContext";
import { Modal } from "./Modal";
import { ProfilePicture } from "./ProfilePicture";
import { User } from "../../interfaces/User";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Options } from "../Options";
import { profileOptions } from "./optionsConstant";

interface Props {
  userData: User;
}

export const ProfileHeader: React.FC<Props> = ({ userData }) => {
  let [isOpen, setIsOpen] = useState(false);
  const { id, username, name, pfp } = userData;
  const { user } = useUser();
  function openModal() {
    setIsOpen(true);
  }
  const options = profileOptions(user, id, openModal);
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="flex flex-col w-full sm:flex-row sm:justify-between gap-y-4 p-3">
      <section className="flex gap-x-3 justify-between items-center">
        <span className="flex items-center gap-2">
          <ProfilePicture src={pfp} h={"h-14"} w={"w-14"} />
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-montserrat font-semibol dark:text-white">
            {username}
          </h1>
        </span>
        <span className="flex items-center gap-x-1">
          <Options
            Icon_options={Bars3Icon}
            className="h-6 w-6 mt-1 dark:text-white"
            options={options}
          />
        </span>
        <Modal closeModal={closeModal} isOpen={isOpen} userData={userData} />
      </section>
      <section className="flex items-center gap-x-3">
        <span className="font-montserrat text-xs sm:text-sm md:text-base dark:text-white">
          {name}
        </span>
        <span className="flex items-center gap-1">
          <ProfileFollowers userData={userData} />
          <ProfileFollows userData={userData} />
        </span>
        {user.id == id ? null : <FollowButton userData={userData} />}
      </section>
    </div>
  );
};
