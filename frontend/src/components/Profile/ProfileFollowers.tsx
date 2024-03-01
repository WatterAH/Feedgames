import React from "react";
import { User } from "../../interfaces/User";
import { Modal } from "../Modal";

export const ProfileFollowers = ({ userData }: { userData: User }) => {
  const { followers } = userData;
  return (
    <Modal
      opener={
        <span className="text-xs font-montserrat py-1 px-2 rounded-full bg-gray-200 cursor-pointer">
          {followers.length} {followers.length == 1 ? "Seguidor" : "Seguidores"}
        </span>
      }
    >
      <div className="flex p-6">
        <header>
          <h1 className="font-montserrat text-xl">Tus seguidores</h1>
        </header>
      </div>
    </Modal>
  );
};
