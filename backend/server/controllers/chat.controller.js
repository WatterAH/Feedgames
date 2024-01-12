import {
  getFollowers,
  getFollows,
  getProfilesByIds,
} from "../database/simpleGet.js";

export const getFriendsById = async (req, res) => {
  try {
    const { id } = req.query;
    const [followersRes, followsRes] = await Promise.all([
      getFollowers(id),
      getFollows(id),
    ]);
    let { followers, error: errorFollowers } = followersRes;
    let { follows, error: errorFollows } = followsRes;
    if (errorFollows || errorFollowers) {
      return res.status(400).json({ message: "Error al cargar tus amigos" });
    } else {
      followers = followers.map((follower) => follower.id_follower);
      follows = follows.map((follow) => follow.id_followed);
      let friends = followers.filter((follower) => follows.includes(follower));
      const { users, error } = await getProfilesByIds(friends);
      if (error) {
        return res.status(400).json({ message: "Error al cargar tus amigos" });
      }
      return res.status(200).json(users);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
