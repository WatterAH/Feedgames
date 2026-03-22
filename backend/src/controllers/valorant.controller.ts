import shortUUID from "short-uuid";
import userService from "../service/userService";
import ValService from "../service/valService";
import { createAccessToken, validateToken } from "../libs/token";
import { filterMatch } from "../libs/arrays";
import { Request, RequestHandler, Response } from "express";
import { processMatch, processUser } from "../libs/server";
import { sendError, sendSuccess } from "../libs/responseHandler";

const translator = shortUUID();

class ValController {
  async auth(req: Request, res: Response) {
    try {
      const id = req.params.userId as string;
      const userId = translator.toUUID(id);
      const valClient = new ValService();

      const url = valClient.auth(userId);
      console.log(url);
      return res.redirect(url);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async unlink(req: Request, res: Response) {
    try {
      const id = req.params.userId as string;
      const userId = translator.toUUID(id);

      const updated = await userService.update(userId, { riotId: null });
      if (updated.error) return sendError(res, updated.error.message, 400);
      if (!updated.data) return sendError(res, "No se pudo completar", 500);

      const user = processUser(updated.data, "");
      const token = await createAccessToken(user);
      return sendSuccess(res, { user, token });
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async callback(req: Request, res: Response) {
    try {
      const clientURL = process.env.CLIENT_URL!;
      const code = req.query.code as string;
      const state = req.query.state as string;

      const valClient = new ValService();

      const accessToken = await valClient.exchange(code);
      if (!accessToken) return res.redirect(clientURL + "?error=true");

      const riotId = await valClient.identify(accessToken);
      if (!riotId) return res.redirect(clientURL + "?error=true");

      const updated = await userService.update(state, { riotId });
      if (updated.error) return res.redirect(clientURL);
      if (!updated.data) return res.redirect(clientURL + "?error=true");

      const user = processUser(updated.data, "");

      const token = (await createAccessToken(user)) as string;
      return res.redirect(
        clientURL + "/home" + "?token=" + encodeURIComponent(token),
      );
    } catch (error) {
      const clientURL = process.env.SERVER_URL!;
      return res.redirect(clientURL + "?error=true");
    }
  }
}

export default new ValController();

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
          encodeURIComponent(riotToken as string),
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
          match.queueId == "swiftplay",
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

    const updated = await userService.update(id_user, { riotId });
    if (updated.error) return sendError(res, updated.error.message, 400);
    if (!updated.data) return sendError(res, "No se pudo completar", 500);

    updated.data.id = translator.fromUUID(updated.data.id);

    const userToken = await createAccessToken(updated.data);

    res.status(200).json({ token: userToken, user: updated.data });
  } catch (error) {
    res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
