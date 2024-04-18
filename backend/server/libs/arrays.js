"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterMatch = exports.uniques = exports.joinObjects = exports.findMaxItem = void 0;
const findMaxItem = function (arr) {
    const maxItem = Math.max.apply(Math, arr);
    if (maxItem == 0) {
        return -1;
    }
    return arr.indexOf(maxItem);
};
exports.findMaxItem = findMaxItem;
const joinObjects = function (arrIndex, arr) {
    arr = [arr[arrIndex[0]], arr[arrIndex[1]], arr[arrIndex[2]]];
    return arr.filter(function (current) {
        return current != undefined;
    });
};
exports.joinObjects = joinObjects;
const uniques = function (arr) {
    return arr.filter(function (item, index, arr) {
        return arr.indexOf(item) === index;
    });
};
exports.uniques = uniques;
const filterMatch = (match, puuid) => {
    let { matchInfo, players, teams, roundResults } = match;
    let { matchId, mapId, queueId } = matchInfo;
    matchInfo = { matchId, mapId, queueId };
    let player = players.find((player) => player.puuid == puuid);
    let { teamId, characterId, stats } = player;
    let { score, kills, deaths, assists } = stats;
    stats = { score, kills, deaths, assists };
    player = { puuid, teamId, characterId, stats };
    roundResults = roundResults.map((round) => {
        let { roundNum, playerStats } = round;
        // @ts-ignore
        playerStats = playerStats.find((stat) => stat.puuid == puuid);
        // @ts-ignore
        let { damage, economy } = playerStats;
        // @ts-ignore
        playerStats = { damage, economy };
        return { roundNum, playerStats };
    });
    return { matchInfo, player, teams, roundResults };
};
exports.filterMatch = filterMatch;
