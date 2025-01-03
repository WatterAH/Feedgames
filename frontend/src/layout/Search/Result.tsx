import React from "react";
import ProfilePicture from "@/components/Profile/ProfilePicture";
import { User } from "@/interfaces/User";
import { BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const Result: React.FC<User> = ({ id, pfp, name, username, followers }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/u/${id}`);
  };

  return (
    <div
      className="flex items-center justify-between w-full border-b py-3 px-5 hover:cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center gap-x-3">
        <ProfilePicture h={40} w={40} src={pfp} />
        <div className="">
          <span className="flex items-center">
            <p className="font-semibold">{username}</p>
            {followers > 2 && (
              <BadgeCheck fill="#38bdf8" className="h-4 mt-1 text-white" />
            )}
          </span>
          <p className="text-secondaryicon text-sm">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default Result;
