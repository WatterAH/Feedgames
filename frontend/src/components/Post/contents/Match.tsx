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
    <div className="flex flex-col border border-border rounded-xl shadow-sm w-full">
      <div className="relative">
        <span className="absolute z-20 flex items-center gap-x-4">
          <Image
            src={agentImg}
            width={112}
            height={112}
            alt={agentName}
            className="rounded-t-xl"
          />
          <div>
            <h3 className="font-extrabold font-raleway text-lg text-white">
              {agentName}
            </h3>
            <span className="text-white text-sm font-raleway font-medium flex items-center justify-center">
              {mapName} | {stats.queueId}
            </span>
          </div>
        </span>
        <div className="relative w-full h-28 overflow-hidden">
          <Image
            alt={mapName}
            src={mapIcon}
            fill
            className="rounded-t-xl blur-[1.5px]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      <div className="flex justify-around py-3 border-b border-border">
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

      <div className="flex flex-wrap w-full max-w-md justify-center mx-auto gap-x-20 gap-y-3 p-3">
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
