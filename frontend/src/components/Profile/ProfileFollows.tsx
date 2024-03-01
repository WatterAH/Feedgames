import React from "react";
import { User } from "../../interfaces/User";
import { Modal } from "../Modal";

export const ProfileFollows = ({ userData }: { userData: User }) => {
  const { followed } = userData;
  return (
    <Modal
      opener={
        <span className="text-xs text-white font-montserrat py-1 px-2 rounded-full bg-teal-800 cursor-pointer">
          {followed.length} {followed.length == 1 ? "Seguido" : "Seguidos"}
        </span>
      }
    >
      <div className="p-6">
        <header>
          <h1 className="font-montserrat text-xl">Cuentas que sigues</h1>
        </header>
      </div>
    </Modal>
  );
};
