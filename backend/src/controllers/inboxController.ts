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
      const { id, users } = req.body;

      if (!users || users.length < 1) {
        return sendError(res, "At least 1 user is required", 400);
      }

      const ownerId = translator.toUUID(id);
      const guestsIds = users.map((u: string) => translator.toUUID(u));

      const members = Array.from(new Set([...guestsIds, ownerId]));

      const existing = await inboxService.exists(members);
      if (existing.error) return sendError(res, existing.error.message, 400);

      if (existing.data) {
        const party = processParty(existing.data, ownerId);
        return sendSuccess(res, party);
      }

      const newParty = await inboxService.create({});
      if (newParty.error) return sendError(res, newParty.error.message, 400);
      if (!newParty.data) return sendError(res, "Not found", 404);

      await Promise.all(
        members.map((id) => {
          const role = id === ownerId ? "admin" : "member";
          return inboxService.join(newParty.data!.id, id, role);
        }),
      );

      const final = await inboxService.find(newParty.data.id);
      if (final.error) return sendError(res, final.error.message, 400);
      if (!final.data) return sendError(res, "Not found after creation", 404);

      members.forEach((id: string) => {
        const userId = translator.fromUUID(id);
        io.to(userId).emit("new_party", processParty(final.data, id));
      });

      const party = processParty(final.data, ownerId);
      return sendSuccess(res, party);
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

      const query = await inboxService.send(data);
      if (query.error) return sendError(res, query.error.message, 400);
      if (!query.data) return sendError(res, "Not found", 404);
      const result = processMessage(query.data);
      io.to(message.party_id).emit("message", result);

      const party = await inboxService.find(partyId);
      if (party.error) return sendError(res, party.error.message, 400);
      if (!party.data) return sendError(res, "Not found", 404);

      const dataParty = processParty(party.data, userId);

      dataParty.members.forEach((member: any) => {
        io.to(member.id).emit("new_message", {
          party_id: message.party_id,
          last_message: dataParty.last_message,
        });
      });

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
