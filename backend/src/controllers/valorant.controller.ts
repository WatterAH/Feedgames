import shortUUID from "short-uuid";
import userService from "../service/userService";
import ValService from "../service/valService";
import { createAccessToken } from "../libs/token";
import { Request, Response } from "express";
import { processUser } from "../libs/server";
import { sendError, sendSuccess } from "../libs/responseHandler";

const translator = shortUUID();

class ValController {
  async auth(req: Request, res: Response) {
    try {
      const id = req.params.userId as string;
      const userId = translator.toUUID(id);
      const valClient = new ValService();

      const url = valClient.auth(userId);
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

  async list(req: Request, res: Response) {
    try {
      const puuid = req.params.puuid as string;
      const valClient = new ValService();
      const matchesIds = await valClient.list(puuid);

      if (matchesIds.length == 0) {
        return sendError(res, "No hay partidos", 404);
      }

      const promises = matchesIds.map((match) =>
        valClient.find(match.matchId, puuid),
      );

      const list = await Promise.all(promises);
      return sendSuccess(res, list);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }
}

export default new ValController();
