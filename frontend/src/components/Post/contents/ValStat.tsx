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
        <p className="text-gray-800 dark:text-white font-semibold text-xl">
          {stat}
        </p>
        <Icon className="text-secondaryicon dark:text-white h-5" />
      </div>
      <p className="text-secondaryicon dark:text-gray-200 font-raleway">
        {title}
      </p>
    </div>
  );
};

export default ValStat;
