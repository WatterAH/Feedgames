import React from "react";
import Image from "next/image";
import ValStat from "./ValStat";
import { MatchShowCase } from "@/interfaces/Valorant";
import {
  Crosshair,
  DollarSign,
  Flame,
  Percent,
  Sparkles,
  Star,
  Sword,
  Swords,
} from "lucide-react";
import { getAgent } from "@/constants/agentnames";
import { getMap } from "@/constants/mapnames";
import { getKDAStats } from "@/functions/valorant";

interface Props {
  stats: MatchShowCase;
}
const MatchPost: React.FC<Props> = ({ stats }) => {
  const { agentName, agentImg } = getAgent(stats.characterId);
  const { mapName, mapIcon } = getMap(stats.mapId);
  const kda = getKDAStats(stats.playerStats);

  return (
    <div className="flex flex-col border rounded-lg shadow-sm w-full">
      <div className="relative">
        <span className="absolute z-20 flex items-center gap-x-4">
          <Image
            src={agentImg}
            width={80}
            height={80}
            alt={agentName}
            className="rounded-t-md"
          />
          <div>
            <h3 className="font-extrabold font-raleway text-lg text-white">
              {agentName}
            </h3>
            <span className="text-white text-sm bg-gray-100 rounded-md backdrop-blur-md bg-opacity-10 px-2 font-raleway flex items-center justify-center">
              {mapName} | {stats.queueId}
            </span>
          </div>
        </span>
        <div className="relative w-full h-20">
          <Image
            alt={mapName}
            src={mapIcon}
            fill
            className="rounded-t-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      <div className="flex justify-around py-3 border-b">
        <span className="flex font-medium text-xs text-outline">
          <Crosshair className="text-icon h-4" />
          <p>{kda}</p>
        </span>
        <span className="flex font-medium text-xs text-outline">
          <Swords className="text-icon h-4" />
          <p>{stats.results}</p>
        </span>
        <span className="flex font-medium text-xs text-outline">
          <Star className="text-icon h-4" />
          <p>{stats.playerStats.score}</p>
        </span>
      </div>

      <div className="flex flex-wrap justify-center gap-x-20 gap-y-3 px-2 py-3">
        <ValStat title="KDA" stat={stats.kda} Icon={Crosshair} />
        <ValStat title="ACS" stat={stats.scorePerRound} Icon={Sparkles} />
        <ValStat title="HS" stat={stats.hsPercentage} Icon={Percent} />
        <ValStat title="Economía" stat={stats.economyRatio} Icon={DollarSign} />
        <ValStat title="KPR" stat={stats.killsPerRound} Icon={Sword} />
        <ValStat title="ADR" stat={stats.damagePerRound} Icon={Flame} />
      </div>
    </div>
  );
};

export default MatchPost;
