import { URL } from "../App";
import { Match, MatchList, Player } from "../interfaces/Valorant";

export const getCharacterInfo = async (uuid: string) => {
  const res = await fetch(`https://valorant-api.com/v1/agents/${uuid}`);
  if (!res.ok) {
    throw new Error("No se pudo cargar la imagen.");
  } else {
    const resData = await res.json();
    const { data } = resData;
    return data;
  }
};

export const getPlayerByName = async (
  gameName: string,
  tagLine: string
): Promise<Player> => {
  const res = await fetch(
    `${URL}/api/getPlayerByName?gameName=${encodeURIComponent(
      gameName
    )}&tagLine=${encodeURIComponent(tagLine)}`
  );

  const resData = await res.json();

  if (!res.ok) {
    const { message } = resData;
    throw new Error(message);
  } else {
    return resData;
  }
};

export const getMatchesListByPuuid = async (
  puuid: string
): Promise<MatchList[]> => {
  const res = await fetch(
    `${URL}/api/getMatchesIdsByPuuid?puuid=${encodeURIComponent(puuid)}`
  );
  const resData = await res.json();

  if (!res.ok) {
    const { message } = resData;
    throw new Error(message);
  } else {
    return resData;
  }
};

export const getMatchByUuid = async (uuid: string): Promise<Match> => {
  const res = await fetch(
    `${URL}/api/getMatchByUuid?uuid=${encodeURIComponent(uuid)}`
  );
  const resData = await res.json();

  if (!res.ok) {
    const { message } = resData;
    throw new Error(message);
  } else {
    return resData;
  }
};
