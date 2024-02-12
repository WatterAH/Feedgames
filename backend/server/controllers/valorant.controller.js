import {
  getMatchByUuidEndpoint,
  getPlayerByNameEndpoint,
  getPlayerMatchesIdsEndpoint,
} from "../constants/valorantEndpoints.js";

export const getPlayerByName = async (req, res) => {
  try {
    const { gameName, tagLine } = req.query;
    const ENDPOINT = getPlayerByNameEndpoint(gameName, tagLine);
    const response = await fetch(ENDPOINT);
    if (!response.ok) {
      return res.status(400).json({ message: "No se encontró el jugador." });
    }
    const resData = await response.json();
    return res.status(200).json(resData);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMatchesIdsByPuuid = async (req, res) => {
  try {
    const { puuid } = req.query;
    const ENDPOINT = getPlayerMatchesIdsEndpoint(puuid);
    const response = await fetch(ENDPOINT);
    if (!response.ok) {
      return res.status(400).json({ message: "Ocurrió un error" });
    }
    const resData = await response.json();
    let { history } = resData;
    history = history.filter((match) => match.queueId === "competitive");
    history = history.slice(0, 5);
    return res.status(200).json(history);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMatchByUuid = async (req, res) => {
  try {
    const { uuid } = req.query;
    const ENDPOINT = getMatchByUuidEndpoint(uuid);
    const response = await fetch(ENDPOINT);
    if (!response.ok) {
      return res.status(400).json({ message: "No se encontró la partida" });
    }
    const resData = await response.json();
    return res.status(200).json(resData);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
