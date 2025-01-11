import React from "react";
import { User } from "@/interfaces/User";
import { calculateDate } from "@/functions/date";

interface Props {
  data: User;
  detailsClass: string;
}

const Details: React.FC<Props> = ({ data, detailsClass }) => {
  const { followers, followed, created_at } = data;
  const date = calculateDate(created_at, true);

  return (
    <div className={`flex flex-col gap-y-2 ${detailsClass} font-inter text-sm`}>
      <p>Se unió el {date}</p>
      <span>
        {followers} {followers == 1 ? "Seguidor" : "Seguidores"} · {followed}{" "}
        {followed == 1 ? "Seguido" : "Seguidos"}
      </span>
    </div>
  );
};

export default Details;
