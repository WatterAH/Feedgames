import React, { useEffect, useState } from "react";
import { MatchShowCase } from "../../interfaces/Valorant";
import { getCharacterIcon } from "../../Api/valorant";

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
    <div className="flex flex-col font-montserrat gap-3 bg-gray-100 rounded-md shadow-sm border h-full w-full">
      <header className="flex justify-between">
        <section className="flex items-center">
          <img src={characterIcon} alt="." className="overflow-hidden w-52" />
          <span className="flex flex-col gap-y-6">
            <section className="flex flex-col md:flex-row gap-5">
              <span className="flex flex-col gap-y-1">
                <p className="text-gray-800 text-sm">
                  {stats.gameName}
                  <span className="text-gray-600 text-xs">
                    {" "}
                    #{stats.tagLine}
                  </span>
                </p>
                <span className="flex items-center text-gray-800">
                  <p>{stats.playerStats.kills}/</p>
                  <p>{stats.playerStats.deaths}/</p>
                  <p>{stats.playerStats.assists}</p>
                </span>
              </span>
              <section className="flex justify-center flex-col gap-1 text-sm">
                <p className="text-gray-600">{stats.mapName}</p>
                <p className="text-gray-800">{stats.queueId}</p>
              </section>
            </section>
            <section className="flex items-center justify-start md:justify-center text-xl">
              <p className="text-green-600">{stats.roundsWon}</p>
              <p className="">:</p>
              <p className="text-red-600">{stats.roundsLoose}</p>
            </section>
          </span>
        </section>
      </header>
      <main className="flex flex-col gap-3 pb-2 mx-auto w-full max-w-md">
        <p className="text-lg text-gray-700 mx-auto">Estadisticas</p>
        <div className="flex flex-col gap-3">
          <section className="flex justify-between px-2">
            <span className="flex flex-col items-center">
              <p className="text-gray-600 text-xs">KDA</p>
              <p className="text-sm text-gray-800">{stats.kda}</p>
            </span>
            <span className="flex flex-col items-center">
              <p className="text-gray-600 text-xs">Puntaje</p>
              <p className="text-gray-800 text-sm">{stats.playerStats.score}</p>
            </span>
            <span className="flex flex-col items-center">
              <p className="text-gray-600 text-xs">Hs</p>
              <p className="text-gray-800 text-sm">{stats.hsPercentage}%</p>
            </span>
            <span className="flex flex-col items-center">
              <p className="text-gray-600 text-xs">Economia</p>
              <p className="text-gray-800 text-sm">{stats.economyRatio}</p>
            </span>
          </section>
          <section className="flex justify-around px-2">
            <span className="flex flex-col items-center">
              <p className="text-gray-600 text-xs">Kills por ronda</p>
              <p className="text-gray-800 text-sm">{stats.killsPerRound}</p>
            </span>
            <span className="flex flex-col items-center">
              <p className="text-gray-600 text-xs">Daño por ronda</p>
              <p className="text-gray-800 text-sm">{stats.damagePerRound}</p>
            </span>
          </section>
        </div>
      </main>
    </div>
  );
};
