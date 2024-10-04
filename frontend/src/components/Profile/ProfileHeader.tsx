import React from "react";
import Options from "../Global/Options";
import ProfilePicture from "./ProfilePicture";
import Follow from "./Follow";
import { User } from "@/interfaces/User";
import { calculateDate } from "@/functions/date";
import { ProfileOptions } from "@/constants/profileOptions";
import { useUser } from "@/context/AuthContext";
import { BadgeCheck, Menu } from "lucide-react";

interface Props {
  data: User;
}

const ProfileHeader: React.FC<Props> = ({ data }) => {
  const { id, name, username, pfp, details, created_at, followers, followed } =
    data;
  const { user } = useUser();
  const date = calculateDate(created_at);

  const options = ProfileOptions(user, id);

  return (
    <header className="flex flex-col gap-y-4 w-full p-3 lg:px-4 border-b">
      <div className="flex flex-row justify-between">
        <div className="namesContainer flex flex-row items-center gap-x-3">
          <ProfilePicture src={pfp} w={96} h={96} />
          <section className="flex flex-col gap-y-1">
            <span className="flex flex-row items-center gap-x-1">
              <h1 className="text-3xl font-inter font-semibold">{username}</h1>
              {followers > 2 && <BadgeCheck fill="#38bdf8" className="h-8" />}
            </span>
            <p className="font-inter text-gray-500">{name}</p>
          </section>
        </div>
        <button>
          <Options Icon_options={Menu} className="h-7" options={options} />
        </button>
      </div>
      <p className="text-gray-500 text-sm font-inter">{details}</p>
      <div className="followContainer">
        <Follow data={data} />
      </div>
      <div className="detailsContainer flex flex-col gap-y-2 text-gray-500 font-inter text-sm">
        <p>Se unió el {date}</p>
        <span>
          {followers} {followers == 1 ? "Seguidor" : "Seguidores"} · {followed}{" "}
          {followed == 1 ? "Seguido" : "Seguidos"}
        </span>
      </div>
    </header>
  );
};

export default ProfileHeader;
