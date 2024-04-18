import { RequestHandler } from "express";
import {
  getFollowers,
  getFollows,
  getProfilesByIds,
} from "../database/profileGetter";

export const getFriendsById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.query;
    const [followersRes, followsRes] = await Promise.all([
      getFollowers(id as string),
      getFollows(id as string),
    ]);
    let { followers, error: errorFollowers } = followersRes;
    let { follows, error: errorFollows } = followsRes;
    if (errorFollows || errorFollowers) {
      return res.status(400).json({ message: "Algo salió mal" });
    } else {
      followers = followers
        ? followers.map((follower) => follower.id_follower)
        : [];
      follows = follows ? follows.map((follow) => follow.id_followed) : [];
      // @ts-ignore
      let friends = followers.filter((follower) => follows.includes(follower));
      const { users, error } = await getProfilesByIds(friends);
      if (error) return res.status(400).end();

      return res.status(200).json(users);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
