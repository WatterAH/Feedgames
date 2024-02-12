import dotenv from "dotenv";
dotenv.config();

const api_key = process.env.RIOT_API_KEY;

export const getPlayerByNameEndpoint = (gameName, tagLine) => {
  return `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${api_key}`;
};

export const getPlayerMatchesIdsEndpoint = (puuid) => {
  return `https://na.api.riotgames.com/val/match/v1/matchlists/by-puuid/${puuid}?api_key=${api_key}`;
};

export const getMatchByUuidEndpoint = (uuid) => {
  return `https://na.api.riotgames.com/val/match/v1/matches/${uuid}?api_key=${api_key}`;
};
