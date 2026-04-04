import { Request, Response } from "express";
import shortUUID from "short-uuid";
import inboxService from "../service/inboxService";
import { sendError, sendSuccess } from "../libs/responseHandler";
import { processMessage, processParty } from "../libs/server";
import { Message } from "../interfaces/Party";
import { io } from "../server";

const translator = shortUUID();

class InboxController {
  async list(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const rawlimit = req.query.limit as string;
      const rawpage = req.query.page as string;

      const page = parseInt(rawpage, 10);
      const limit = parseInt(rawlimit, 10);
      const userId = translator.toUUID(id);

      const query = await inboxService.list(userId, limit, page);
      if (query.error) return sendError(res, query.error.message, 400);
      if (!query.data) return sendError(res, "Not found", 404);

      const result = query.data.map((party) => processParty(party, userId));
      return sendSuccess(res, result);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async find(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const userId = req.query.userId as string;
      const partyId = translator.toUUID(id);
      const parsedUserId = translator.toUUID(userId);

      const query = await inboxService.find(partyId);
      if (query.error) return sendError(res, query.error.message, 400);
      if (!query.data) return sendError(res, "Not found", 404);

      const result = processParty(query.data, parsedUserId);
      return sendSuccess(res, result);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const id = req.body.id as string;
      const users = req.body.users as string[];
      const userId = translator.toUUID(id);
      userId;

      if (!users || users.length < 1) {
        return sendError(res, "At least 1 user is required", 400);
      }

      const list = users.map((user) => translator.toUUID(user));
      list.push(userId);

      const existing = await inboxService.exists(list);
      if (existing.error) return sendError(res, existing.error.message, 400);
      if (existing.data) {
        const id = translator.fromUUID(existing.data);
        return sendSuccess(res, id);
      }

      const party = await inboxService.create({});
      if (party.error) return sendError(res, party.error.message, 400);
      if (!party.data) return sendError(res, "Not found", 404);

      const membersToInsert: any[] = list.map((user) => ({
        party_id: party.data!.id,
        user_id: user,
      }));
      membersToInsert.push({
        party_id: party.data!.id,
        user_id: userId,
        role: "admin",
      });

      await Promise.all(
        membersToInsert.map((member) =>
          inboxService.join(member.party_id, member.user_id),
        ),
      );

      const partyId = translator.fromUUID(party.data.id);

      return sendSuccess(res, partyId);
    } catch (error: any) {
      return sendError(res, error.message, 400);
    }
  }

  async messages(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const userId = req.query.userId as string;
      const rawlimit = req.query.limit as string;
      const rawpage = req.query.page as string;

      const partyId = translator.toUUID(id);
      const limit = parseInt(rawlimit, 10);
      const page = parseInt(rawpage, 10);

      const query = await inboxService.messages(partyId, limit, page);
      if (query.error) return sendError(res, query.error.message, 400);
      if (!query.data) return sendError(res, "Not found", 404);

      if (page === 0) {
        inboxService.markAsRead(partyId, translator.toUUID(userId));
      }

      const result = query.data.map((message) => processMessage(message));

      return sendSuccess(res, result);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async send(req: Request, res: Response) {
    try {
      const message: Message = req.body;
      const partyId = translator.toUUID(message.party_id);
      const userId = translator.toUUID(message.user_id);

      const data = {
        party_id: partyId,
        user_id: userId,
        content: message.content,
        type: message.type,
      };

      const party = await inboxService.find(partyId);
      if (party.error) return sendError(res, party.error.message, 400);
      if (!party.data) return sendError(res, "Not found", 404);

      const dataParty = processParty(party.data, userId);

      dataParty.members.forEach((member: any) => {
        if (member.id === message.user_id) return;
        io.to(member.id).emit("new_message");
      });

      const query = await inboxService.send(data);
      if (query.error) return sendError(res, query.error.message, 400);
      if (!query.data) return sendError(res, "Not found", 404);
      const result = processMessage(query.data);
      io.to(message.party_id).emit("message", result);

      return sendSuccess(res, result);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async markAsRead(req: Request, res: Response) {
    try {
      const partyId = translator.toUUID(req.body.partyId as string);
      const userId = translator.toUUID(req.body.userId as string);

      await inboxService.markAsRead(partyId, userId);

      return sendSuccess(res, true);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async hasUnread(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const userId = translator.toUUID(id);

      const query = await inboxService.hasUnread(userId);
      if (query.error) return sendError(res, query.error.message, 400);
      if (!query.data) return sendError(res, "Not found", 404);

      const unread = query.data.some((party) => {
        const myReadAt = party.me?.[0]?.last_read_at;
        const lastMsgAt = party.last_message_at;

        if (!lastMsgAt || !myReadAt) return false;

        if (party.last_message_user_id === userId) return false;

        return new Date(lastMsgAt) > new Date(myReadAt);
      });

      return sendSuccess(res, unread);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }
}

export default new InboxController();
