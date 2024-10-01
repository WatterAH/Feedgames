import React, { useEffect, useState } from "react";
import { MatchShowCase } from "@/interfaces/Valorant";
import { getCharacterIcon } from "@/routes/valorant";
import { Flame } from "lucide-react";
import Image from "next/image";

const Stat = ({ title, stat }: { title: string; stat: string | number }) => {
  return (
    <span className="flex flex-col items-center">
      <p className="text-gray-600 text-xs">{title}</p>
      <p className="text-gray-800 text-sm">{stat}</p>
    </span>
  );
};

interface MatchProps {
  stats: MatchShowCase;
}
export const MatchPost: React.FC<MatchProps> = ({ stats }) => {
  const [characterIcon, setCharacterIcon] = useState("");

  useEffect(() => {
    const fetchIcons = async () => {
      const iconFetched = await getCharacterIcon(stats.characterId, true);
      setCharacterIcon(iconFetched);
    };
    fetchIcons();
  }, [stats.characterId]);

  return (
    <div className="flex flex-col font-montserrat gap-2 bg-amber-50 rounded-md shadow-sm border h-full w-full p-3 relative">
      <header className="flex justify-center items-center gap-2 w-full">
        <Image src={"/valorant.svg"} alt="." width={32} height={32} />
        <p className="text-gray-700">
          {stats.gameName}
          <span className="text-gray-600 text-sm"> #{stats.tagLine}</span>
        </p>
      </header>
      <header className="flex items-center justify-center w-full">
        <Image src={characterIcon} alt="." width={208} height={598} />
        <section className="flex flex-col md:flex-row md:gap-5 gap-2">
          <span className="flex flex-col items-center gap-1">
            <p className="text-gray-800 text-sm">K/D/A</p>
            <span className="flex items-center text-gray-600 text-sm">
              <p>{stats.playerStats.kills}/</p>
              <p>{stats.playerStats.deaths}/</p>
              <p>{stats.playerStats.assists}</p>
            </span>
          </span>
          <section className="flex justify-center items-center flex-col gap-1 text-sm">
            <p className="text-gray-800">{stats.queueId}</p>
            <p className="text-gray-600">{stats.mapName}</p>
          </section>
          <section className="flex flex-col text-sm gap-1">
            <p className="text-gray-800">Resultados</p>
            <span className="flex items-center justify-center">
              <p className="text-gray-600">{stats.roundsWon}</p>
              <p className="text-gray-700">:</p>
              <p className="text-gray-600">{stats.roundsLoose}</p>
            </span>
          </section>
        </section>
      </header>
      <main className="flex flex-col gap-3 pb-4 mx-auto w-full max-w-md">
        <span className="flex items-center justify-center gap-2">
          <p className="text-lg text-gray-700">Estadisticas</p>
          <Flame aria-hidden className="h-6 text-teal-400" />
        </span>
        <div className="flex flex-col gap-3">
          <section className="flex justify-between px-2">
            <Stat title="KDA" stat={stats.kda} />
            <Stat title="Puntaje" stat={stats.scorePerRound} />
            <Stat title="Headshot %" stat={stats.hsPercentage + " %"} />
            <Stat title="Economia" stat={stats.economyRatio} />
          </section>
          <section className="flex justify-around px-2">
            <Stat title="Kills por ronda" stat={stats.killsPerRound} />
            <Stat title="Daño por ronda" stat={stats.damagePerRound} />
          </section>
        </div>
      </main>
    </div>
  );
};
