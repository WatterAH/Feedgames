import React from "react";
import Follow from "@/components/Profile/Follow";
import ProfilePicture from "@/components/Profile/ProfilePicture";
import { User } from "@/interfaces/User";
import { BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/AuthContext";

interface Props {
  data: User;
}

const Result: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const { user } = useUser();
  const { id, name, username, pfp, followers } = data;

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
      <div className="w-28">{user.id !== id && <Follow data={data} />}</div>
    </div>
  );
};

export default Result;
