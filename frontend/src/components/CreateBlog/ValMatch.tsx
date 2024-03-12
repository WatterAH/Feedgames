import React, { useEffect, useState } from "react";
import { Match, PlayerInGame } from "../../interfaces/Valorant";
import {
  getKD,
  getMapName,
  getQueueId,
} from "../../functions/valorantFunctions";
import { getCharacterIcon } from "../../Api/valorant";

interface Props {
  match: Match;
  setPreview: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | Match | null>
  >;
  closeModal: () => void;
}

export const ValMatch: React.FC<Props> = ({
  match,
  setPreview,
  closeModal,
}) => {
  const { matchInfo, player, teams } = match;
  const { queueId, mapId } = matchInfo;
  const { characterId, teamId, stats } = player as PlayerInGame;
  const myTeam = teams.find((team) => team.teamId == teamId);
  const enemyTeam = teams.find((team) => team.teamId !== teamId);
  const [characterIcon, setCharacterIcon] = useState("");

  const handleClick = () => {
    setPreview(match);
    closeModal();
  };

  useEffect(() => {
    const fetchIcons = async () => {
      const iconFetched = await getCharacterIcon(characterId);
      setCharacterIcon(iconFetched);
    };
    fetchIcons();
  }, [characterId]);

  return (
    <div
      className={`flex items-center justify-between p-4 border-b font-montserrat rounded-md shadow-sm cursor-pointer ${
        myTeam?.won ? "bg-blue-200" : "bg-red-200"
      }`}
      onClick={handleClick}
    >
      <section className="flex items-center gap-2 w-1/3">
        <img src={characterIcon} className="h-7 w-7 outline-none" alt="." />
        <section className="flex items-start justify-start flex-col">
          <section className="flex items-center">
            <p className="text-green-600">{myTeam?.roundsWon}</p>
            <p className="">:</p>
            <p className="text-red-600">{enemyTeam?.roundsWon}</p>
          </section>
          <span className="flex items-center text-xs text-gray-600">
            <p>{stats.kills}/</p>
            <p>{stats.deaths}/</p>
            <p>{stats.assists}</p>
          </span>
        </section>
      </section>
      <section className="w-1/3 flex justify-between">
        <span className="flex flex-col items-center">
          <p className="text-gray-600 text-xs">KDA</p>
          <p className="text-sm text-gray-800">
            {getKD(stats.kills, stats.assists, stats.deaths)}
          </p>
        </span>
        <span className="flex flex-col items-center">
          <p className="text-gray-600 text-xs">Puntaje</p>
          <p className="text-gray-800 text-sm">{stats.score}</p>
        </span>
      </section>
      <section className="flex  items-end justify-center flex-col gap-1 text-xs w-1/3">
        <p className="text-gray-600">{getMapName(mapId)}</p>
        <p className="text-gray-800">{getQueueId(queueId)}</p>
      </section>
    </div>
  );
};
