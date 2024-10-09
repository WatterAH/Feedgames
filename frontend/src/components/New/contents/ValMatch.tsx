import Image from "next/image";
import { getCharacterIcon } from "@/routes/valorant";
import { useEffect, useState } from "react";
import { Match, MatchShowCase } from "@/interfaces/Valorant";
import { getQueueId, valMatchStats } from "@/functions/valorant";

interface Props {
  riotId: {
    puuid: string;
    gameName: string;
    tagLine: string;
  };
  match: Match;
  setVal: (stats: MatchShowCase) => void;
}

const ValMatch: React.FC<Props> = ({ match, riotId, setVal }) => {
  const { preview } = match;
  const [characterIcon, setCharacterIcon] = useState("");

  const handleClick = () => {
    const stats = valMatchStats(match, riotId.gameName, riotId.tagLine);
    setVal(stats);
  };

  useEffect(() => {
    const fetchIcons = async () => {
      const iconFetched = await getCharacterIcon(preview.characterId);
      setCharacterIcon(iconFetched);
    };
    fetchIcons();
  }, [preview.characterId]);

  return (
    <li
      onClick={handleClick}
      className={`flex justify-between hover:cursor-pointer items-center p-2 font-inter border-b ${
        preview.won ? "bg-blue-200" : "bg-red-200"
      }`}
    >
      <div className="flex items-center gap-x-2 w-1/3">
        <div className="rounded-full bg-loading">
          {characterIcon && (
            <Image
              src={characterIcon}
              width={28}
              height={28}
              alt=""
              className="rounded-full"
            />
          )}
        </div>
        <p className="text-xs text-gray-600">{preview.kda}</p>
      </div>
      <div className="w-1/3">
        <p className="text-xs text-center text-gray-600">{preview.results}</p>
      </div>
      <div className="flex flex-col text-xs w-1/3 text-end">
        <p className="text-gray-700">{getQueueId(preview.queueId)}</p>
      </div>
    </li>
  );
};

export default ValMatch;
