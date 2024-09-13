import { URL } from "../App";
import { Match, MatchList } from "../interfaces/Valorant";

export const getMatchesList = async (token: string): Promise<MatchList> => {
  const res = await fetch(
    `${URL}/val/getMatchesList?token=${encodeURIComponent(token)}`
  );
  const resData = await res.json();

  if (res.status == 401) {
    throw new Error("401");
  } else if (res.status == 404) {
    throw new Error("404");
  } else {
    return resData;
  }
};

export const getMatchByUuid = async (
  uuid: string,
  puuid: string
): Promise<Match> => {
  const response = await fetch(
    `${URL}/val/getMatchByUuid?uuid=${encodeURIComponent(
      uuid
    )}&puuid=${encodeURIComponent(puuid)}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const getCharacterIcon = async (
  characterId: string,
  full?: boolean
): Promise<string> => {
  const ENDPOINT = `https://valorant-api.com/v1/agents/${characterId}`;
  const res = await fetch(ENDPOINT);
  if (!res.ok) {
    throw new Error("Error al cargar la imagen");
  } else {
    const resData = await res.json();
    let { displayIconSmall, bustPortrait, abilities } = resData.data;
    abilities = abilities.map((abilitie: any) => abilitie.displayIcon);
    return full ? bustPortrait : displayIconSmall;
  }
};

export const getMapIcon = async (mapId: string) => {
  const ENDPOINT = `https://valorant-api.com/v1/maps/${mapId}`;
  const res = await fetch(ENDPOINT);
  if (!res.ok) {
    throw new Error("Error al cargar la imagen");
  } else {
    const resData = await res.json();
    const { listViewIcon } = resData.data;
    return listViewIcon;
  }
};
