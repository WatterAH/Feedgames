import React, { useEffect, useState } from "react";
import Image from "next/image";
import ValStat from "./ValStat";
import { MatchShowCase } from "@/interfaces/Valorant";
import { getCharacterIcon } from "@/routes/valorant";
import {
  DollarSign,
  Flame,
  Percent,
  ShieldAlert,
  Sparkles,
  UserRoundX,
} from "lucide-react";

interface Props {
  stats: MatchShowCase;
}
const MatchPost: React.FC<Props> = ({ stats }) => {
  const [characterIcon, setCharacterIcon] = useState<string | null>(null);

  useEffect(() => {
    const fetchIcons = async () => {
      const iconFetched = await getCharacterIcon(stats.characterId);
      setCharacterIcon(iconFetched);
    };
    fetchIcons();
  }, [stats.characterId]);

  return (
    <div className="flex flex-col border shadow-md gap-y-6 rounded-md py-6 md:py-10">
      <header className="flex gap-3 w-full justify-center flex-col items-center">
        <div id="playerCharacter" className="rounded-full bg-loading">
          {characterIcon && (
            <Image
              src={characterIcon}
              width={64}
              height={64}
              alt=""
              className="rounded-full"
            />
          )}
        </div>
        <div
          id="playerInfo"
          className="flex flex-col items-center font-raleway"
        >
          <p className="text-threads">
            {stats.gameName}
            <span className="text-gray-600 text-xs"> #{stats.tagLine}</span>
          </p>
          <span className="flex items-center gap-x-1 text-gray-600">
            <p className="text-xs">{stats.queueId}</p>
            <p className="text-lg font-montserrat">·</p>
            <p className="text-xs">{stats.mapName}</p>
          </span>
          <span className="flex items-center text-gray-600 text-xs font-inter">
            <p>{stats.playerStats.kills}/</p>
            <p>{stats.playerStats.deaths}/</p>
            <p>{stats.playerStats.assists}</p>
          </span>
        </div>
      </header>
      <main
        id="stats"
        className="flex flex-wrap justify-center gap-x-20 gap-y-5"
      >
        <ValStat title="KDA" stat={stats.kda} Icon={Flame} />
        <ValStat title="ACS" stat={stats.scorePerRound} Icon={Sparkles} />
        <ValStat title="HS" stat={stats.hsPercentage} Icon={Percent} />
        <ValStat title="Economía" stat={stats.economyRatio} Icon={DollarSign} />
        <ValStat title="KPR" stat={stats.killsPerRound} Icon={UserRoundX} />
        <ValStat title="ADR" stat={stats.damagePerRound} Icon={ShieldAlert} />
      </main>
    </div>
  );
};

export default MatchPost;
