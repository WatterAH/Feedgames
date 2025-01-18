import Image from "next/image";
import { Match, MatchShowCase } from "@/interfaces/Valorant";
import { getQueueId, valMatchStats } from "@/functions/valorant";
import { getMap } from "@/constants/mapnames";
import { getAgent } from "@/constants/agentnames";
import { ChevronRight, Crosshair, Star, Swords } from "lucide-react";

interface Props {
  match: Match;
  setVal: (stats: MatchShowCase) => void;
}

const ValMatch: React.FC<Props> = ({ match, setVal }) => {
  const { preview } = match;
  const { mapName, mapIcon } = getMap(preview.mapId);
  const { agentName, agentImg } = getAgent(preview.characterId);

  const handleClick = () => {
    const stats = valMatchStats(match);
    setVal(stats);
  };

  return (
    <li
      onClick={handleClick}
      className="flex flex-col hover:cursor-pointer border border-border rounded-lg shadow-sm max-w-xs w-full mx-auto"
    >
      <div className="relative overflow-hidden">
        <span className="absolute z-20 flex items-center gap-x-3">
          <Image
            src={agentImg}
            width={64}
            height={64}
            alt={agentName}
            className="rounded-t-lg"
          />
          <div>
            <h3 className="font-bold font-raleway text-white">{agentName}</h3>
            <span className="text-white text-sm font-raleway font-medium flex items-center justify-center">
              {mapName} | {getQueueId(preview.queueId)}
            </span>
          </div>
        </span>
        <div className="relative w-full h-16 rounded-t-lg overflow-hidden">
          <Image
            src={mapIcon}
            alt={mapName}
            fill
            className="w-full rounded-t-lg blur-[1px]"
          />
        </div>
      </div>
      <div className="flex justify-between px-3 py-1 font-medium text-xs text-text">
        <span className="flex items-center justify-center gap-x-0.5">
          <Crosshair className="text-placeholder h-4" />
          {preview.kda}
        </span>
        <span className="flex items-center justify-center gap-x-0.5">
          <Star className="text-placeholder h-4" />
          {preview.score}
        </span>
        <span className="flex items-center justify-center gap-x-0.5">
          <Swords className="text-placeholder h-4" />
          {preview.results}
        </span>
        <span className="p-0.5 bg-placeholder rounded-md">
          <ChevronRight className="h-5" />
        </span>
      </div>
    </li>
  );
};

export default ValMatch;
