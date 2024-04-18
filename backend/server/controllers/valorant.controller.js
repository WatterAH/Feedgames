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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatchByUuid = exports.getMatchesList = exports.getPlayerUuid = exports.oauth2_callback = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const token_1 = require("../libs/token");
const arrays_1 = require("../libs/arrays");
dotenv_1.default.config();
const oauth2_callback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientID = "904e7558-66be-4c49-b89d-1020aad6da43";
    const clientSecret = process.env.RSO_CLIENT_SECRET;
    const auth = `Basic ${Buffer.from(`${clientID}:${clientSecret}`).toString("base64")}`;
    const formData = new URLSearchParams();
    formData.append("grant_type", "authorization_code");
    formData.append("code", req.query.code);
    formData.append("redirect_uri", "https://craftfeed.fly.dev/oauth2-callback");
    try {
        const response = yield fetch("https://auth.riotgames.com/token", {
            method: "POST",
            headers: {
                Authorization: auth,
            },
            body: formData,
        });
        if (!response.ok) {
            throw new Error("500");
        }
        else {
            const tokens = yield response.json();
            const access_token = tokens.access_token;
            return res.redirect(`/val/getPlayerUuid?access_token=${access_token}`);
        }
    }
    catch (error) {
        return res.redirect("https://feedgames.vercel.app");
    }
});
exports.oauth2_callback = oauth2_callback;
const getPlayerUuid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { access_token } = req.query;
        const ENDPOINT_URL = "https://americas.api.riotgames.com/riot/account/v1/accounts/me";
        const response = yield fetch(ENDPOINT_URL, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        if (!response.ok) {
            const errorResponse = yield response.text();
            throw new Error(errorResponse);
        }
        else {
            const userData = yield response.json();
            const riotToken = yield (0, token_1.createAccessToken)(userData);
            return res.redirect("https://feedgames.vercel.app?riotToken=" +
                encodeURIComponent(riotToken));
        }
    }
    catch (error) {
        return res.redirect("https://feedgames.vercel.app?");
    }
});
exports.getPlayerUuid = getPlayerUuid;
const getMatchesList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.query;
        const userData = yield (0, token_1.validateToken)(token);
        if (!userData) {
            return res.status(401).json({ message: "Token invalido o expirado" });
        }
        const { puuid } = userData;
        const ENDPOINT_URL = `https://na.api.riotgames.com/val/match/v1/matchlists/by-puuid/${puuid}`;
        const response = yield fetch(ENDPOINT_URL, {
            // @ts-ignore
            headers: {
                "X-Riot-Token": process.env.RIOT_API_KEY,
            },
        });
        if (response.status == 404) {
            return res.status(404).json({ message: "No hay partidos" });
        }
        else if (!response.ok) {
            return res.status(400).json({ message: "Algo salio mal" });
        }
        else {
            const resData = yield response.json();
            let { puuid, history } = resData;
            history = history.filter((match) => match.queueId == "competitive" ||
                match.queueId == "unrated" ||
                match.queueId == "swiftplay");
            return res.status(200).json({ history: history.slice(0, 20), puuid });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.getMatchesList = getMatchesList;
const getMatchByUuid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uuid, puuid } = req.query;
        const ENDPOINT_URL = `https://na.api.riotgames.com/val/match/v1/matches/${uuid}`;
        const response = yield fetch(ENDPOINT_URL, {
            // @ts-ignore
            headers: {
                "X-Riot-Token": process.env.RIOT_API_KEY,
            },
        });
        if (!response.ok) {
            return res.status(400).json({ message: "Algo salio mal" });
        }
        else {
            let match = yield response.json();
            match = (0, arrays_1.filterMatch)(match, puuid);
            return res.status(200).json(match);
        }
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.getMatchByUuid = getMatchByUuid;
