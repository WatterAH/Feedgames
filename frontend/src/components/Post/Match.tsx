import React, { useEffect, useState } from "react";
import { Match } from "../../interfaces/Valorant";
import { valMatchStats } from "../../functions/valorantFunctions";
import { getCharacterIcon } from "../../Api/valorant";

interface MatchProps {
  match: Match;
}
export const MatchPost: React.FC<MatchProps> = ({ match }) => {
  const stats = valMatchStats(match);
  const [characterIcon, setCharacterIcon] = useState("");

  useEffect(() => {
    const fetchIcons = async () => {
      const iconFetched = await getCharacterIcon(stats.characterId, true);
      setCharacterIcon(iconFetched);
    };
    fetchIcons();
  }, [stats.characterId]);
  return (
    <div className="flex flex-col w-full font-montserrat gap-3">
      <header className="flex justify-between">
        <section className="flex items-center">
          <img src={characterIcon} alt="." className="overflow-hidden w-52" />
          <span className="flex flex-col gap-y-3">
            <section>
              <p className="text-gray-800 text-sm">
                {stats.gameName}
                <span className="text-gray-600 text-xs"> #{stats.tagLine}</span>
              </p>
              <span className="flex items-center text-gray-950">
                <p>{stats.stats.kills}/</p>
                <p>{stats.stats.deaths}/</p>
                <p>{stats.stats.assists}</p>
              </span>
            </section>
            <section className="flex justify-center flex-col gap-1 text-xs">
              <p className="text-gray-600">{stats.mapName}</p>
              <p className="text-gray-800">{stats.queueId}</p>
            </section>
            <section className="flex items-center">
              <p className="text-green-600">{stats.roundsWon}</p>
              <p className="">:</p>
              <p className="text-red-600">{stats.roundsLoose}</p>
            </section>
          </span>
        </section>
      </header>
      <main className="flex flex-col gap-2">
        <p className="text-lg text-gray-700">Estadisticas</p>
        <div className="flex flex-col gap-3">
          <section className="flex justify-between px-2">
            <span className="flex flex-col items-center">
              <p className="text-gray-600 text-xs">KDA</p>
              <p className="text-sm text-gray-800">{stats.kda}</p>
            </span>
            <span className="flex flex-col items-center">
              <p className="text-gray-600 text-xs">Puntaje</p>
              <p className="text-gray-800 text-sm">{stats.stats.score}</p>
            </span>
            <span className="flex flex-col items-center">
              <p className="text-gray-600 text-xs">HS%</p>
            </span>
            <span className="flex flex-col items-center">
              <p className="text-gray-600 text-xs">Economia</p>
            </span>
          </section>
          <section className="flex justify-around px-2">
            <span className="flex flex-col items-center">
              <p className="text-gray-600 text-xs">Kills/Ronda</p>
            </span>
            <span className="flex flex-col items-center">
              <p className="text-gray-600 text-xs">Score/Ronda</p>
            </span>
          </section>
        </div>
        <p className="text-lg text-gray-700">Habilidades</p>
      </main>
    </div>
  );
};
