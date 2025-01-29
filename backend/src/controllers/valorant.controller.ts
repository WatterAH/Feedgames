import dotenv from "dotenv";
import shortUUID from "short-uuid";
import { createAccessToken, validateToken } from "../libs/token";
import { filterMatch } from "../libs/arrays";
import { RequestHandler } from "express";
import { processMatch } from "../libs/server";
import userService from "../service/userService";
import { sendError } from "../libs/responseHandler";

dotenv.config();
const translator = shortUUID();

export const oauth2_callback: RequestHandler = async (req, res) => {
  const clientID = "904e7558-66be-4c49-b89d-1020aad6da43";
  const clientSecret = process.env.RSO_CLIENT_SECRET;
  const auth = `Basic ${Buffer.from(`${clientID}:${clientSecret}`).toString(
    "base64"
  )}`;

  const formData = new URLSearchParams();
  formData.append("grant_type", "authorization_code");
  formData.append("code", req.query.code as string);
  formData.append("redirect_uri", "https://craftfeed.fly.dev/oauth2-callback");

  try {
    const response = await fetch("https://auth.riotgames.com/token", {
      method: "POST",
      headers: {
        Authorization: auth,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("500");
    } else {
      const tokens = await response.json();
      const access_token = tokens.access_token;
      return res.redirect(`/val/getPlayerUuid?access_token=${access_token}`);
    }
  } catch (error) {
    return res.redirect("https://feedgames.vercel.app/home");
  }
};

export const getPlayerUuid: RequestHandler = async (req, res) => {
  try {
    const { access_token } = req.query;
    const ENDPOINT_URL =
      "https://americas.api.riotgames.com/riot/account/v1/accounts/me";

    const response = await fetch(ENDPOINT_URL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(errorResponse);
    } else {
      const userData = await response.json();
      const riotToken = await createAccessToken(userData);
      return res.redirect(
        "https://feedgames.vercel.app/home?riotToken=" +
          encodeURIComponent(riotToken as string)
      );
    }
  } catch (error) {
    return res.redirect("https://feedgames.vercel.app/home");
  }
};

export const getMatchesList: RequestHandler = async (req, res) => {
  try {
    const { puuid } = req.query;
    const ENDPOINT_URL = `https://na.api.riotgames.com/val/match/v1/matchlists/by-puuid/${puuid}`;
    const response = await fetch(ENDPOINT_URL, {
      // @ts-ignore
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY,
      },
    });
    if (response.status == 404) {
      res.status(404).json({ message: "No hay partidos" });
      return;
    } else if (!response.ok) {
      res.status(400).json({ message: "Algo salio mal" });
      return;
    } else {
      const resData = await response.json();
      let { puuid, history } = resData;
      history = history.filter(
        (match: any) =>
          match.queueId == "competitive" ||
          match.queueId == "unrated" ||
          match.queueId == "swiftplay"
      );
      res.status(200).json({ history: history.slice(0, 15), puuid });
    }
  } catch (error) {
    res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const getMatchByUuid: RequestHandler = async (req, res) => {
  try {
    const { uuid, puuid } = req.query;
    const ENDPOINT_URL = `https://na.api.riotgames.com/val/match/v1/matches/${uuid}`;
    const response = await fetch(ENDPOINT_URL, {
      // @ts-ignore
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY,
      },
    });
    if (!response.ok) {
      return sendError(res, "Algo salio mal", 400);
    }

    let match = await response.json();
    match = filterMatch(match, puuid as string);
    res.status(200).json(processMatch(match));
  } catch (error) {
    res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const setRiotId: RequestHandler = async (req, res) => {
  try {
    const { token, userId } = req.body;
    const id_user = translator.toUUID(userId);

    const user = await validateToken(token);

    if (!user) {
      return sendError(res, "El token no es valido", 401);
    }

    const riotId = user as any;
    delete riotId.exp;
    delete riotId.iat;

    const data = await userService.updateProfile(id_user, { riotId });

    if (!data) {
      return sendError(res, "Error al guardar token", 500);
    }

    data.id = translator.fromUUID(data.id);

    const userToken = await createAccessToken(data);

    res.status(200).json({ token: userToken, user: data });
  } catch (error) {
    res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
