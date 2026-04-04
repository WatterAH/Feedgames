import React from "react";
import ProfilePicture from "../Profile/ProfilePicture";

interface Props {
  avatar: string | null;
  members: {
    id: string;
    name: string;
    pfp: string | undefined;
    last_read_at: string;
  }[];
}

const Avatar: React.FC<Props> = ({ avatar, members }) => {
  if (avatar) return <ProfilePicture h={40} w={40} src={avatar} />;

  if (members.length === 1) {
    return (
      <ProfilePicture
        h={40}
        w={40}
        src={members[0].pfp}
        userId={members[0].id}
      />
    );
  }

  if (members.length === 2) {
    return (
      <div className="relative h-10 w-10">
        <div className="absolute top-0 right-0 z-0">
          <ProfilePicture
            h={26}
            w={26}
            src={members[0].pfp}
            userId={members[0].id}
          />
        </div>
        <div className="absolute bottom-0 left-0 z-10 rounded-full">
          <ProfilePicture
            h={26}
            w={26}
            src={members[1].pfp}
            userId={members[1].id}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-10 w-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0">
        <ProfilePicture
          h={22}
          w={22}
          src={members[0].pfp}
          userId={members[0].id}
        />
      </div>

      <div className="absolute bottom-0 left-0 z-10 rounded-full">
        <ProfilePicture
          h={22}
          w={22}
          src={members[1].pfp}
          userId={members[1].id}
        />
      </div>

      <div className="absolute bottom-0 right-0 z-20 rounded-full">
        <ProfilePicture
          h={22}
          w={22}
          src={members[2].pfp}
          userId={members[2].id}
        />
      </div>
    </div>
  );
};

export default Avatar;
