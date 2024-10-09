import { User } from "@/interfaces/User";
import { Match, MatchList } from "@/interfaces/Valorant";
const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const getMatchesList = async (puuid: string): Promise<MatchList> => {
  const res = await fetch(
    `${URL}/val/getMatchesList?puuid=${encodeURIComponent(puuid)}`
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
    const { displayIconSmall, bustPortrait } = resData.data;
    return full ? bustPortrait : displayIconSmall;
  }
};

export const setRiotId = async (
  token: string,
  userId: string
): Promise<{ user: User; token: string }> => {
  const res = await fetch(`${URL}/val/setRiotId`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, userId }),
  });

  const resData = await res.json();

  if (res.ok) {
    return resData;
  } else {
    throw new Error(resData.message);
  }
};
