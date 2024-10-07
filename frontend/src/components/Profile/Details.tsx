import React from "react";
import { User } from "@/interfaces/User";
import { calculateDate } from "@/functions/date";

interface Props {
  data: User;
}

const Details: React.FC<Props> = ({ data }) => {
  const { followers, followed, created_at } = data;
  const date = calculateDate(created_at);

  return (
    <div className="detailsContainer flex flex-col gap-y-2 text-secondaryicon font-inter text-sm">
      <p>Se unió el {date}</p>
      <span>
        {followers} {followers == 1 ? "Seguidor" : "Seguidores"} · {followed}{" "}
        {followed == 1 ? "Seguido" : "Seguidos"}
      </span>
    </div>
  );
};

export default Details;
