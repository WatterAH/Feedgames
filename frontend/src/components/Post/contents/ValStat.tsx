import React from "react";
import { Flame } from "lucide-react";

interface Props {
  title: string;
  stat: number | string;
  Icon: typeof Flame;
}

const ValStat: React.FC<Props> = ({ title, stat, Icon }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center font-raleway gap-x-0.5">
        <p className="text-text font-semibold text-xl">{stat}</p>
        <Icon className="text-placeholder h-5" />
      </div>
      <p className="text-placeholder font-raleway">{title}</p>
    </div>
  );
};

export default ValStat;
