"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFriendsById = void 0;
const profileGetter_1 = require("../database/profileGetter");
const getFriendsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const [followersRes, followsRes] = yield Promise.all([
            (0, profileGetter_1.getFollowers)(id),
            (0, profileGetter_1.getFollows)(id),
        ]);
        let { followers, error: errorFollowers } = followersRes;
        let { follows, error: errorFollows } = followsRes;
        if (errorFollows || errorFollowers) {
            return res.status(400).json({ message: "Algo salió mal" });
        }
        else {
            followers = followers
                ? followers.map((follower) => follower.id_follower)
                : [];
            follows = follows ? follows.map((follow) => follow.id_followed) : [];
            // @ts-ignore
            let friends = followers.filter((follower) => follows.includes(follower));
            const { users, error } = yield (0, profileGetter_1.getProfilesByIds)(friends);
            if (error)
                return res.status(400).end();
            return res.status(200).json(users);
        }
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.getFriendsById = getFriendsById;
