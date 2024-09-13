import { RequestHandler } from "express";
import { joinParty, newParty } from "../database/insert";

export const createParty: RequestHandler = async (req, res) => {
  try {
    const { usersId, type, name } = req.body;
    const users: string[] = JSON.parse(usersId);
    const { data, error } = await newParty(type, name, null);
    if (error) {
      return res.status(400).json({ message: "Algo salió mal" });
    }
    const promises = users.map((user) => joinParty(data.id, user));
    await Promise.all(promises);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
