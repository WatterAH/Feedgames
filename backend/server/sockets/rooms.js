"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinRoom = void 0;
const joinRoom = (socket) => {
    socket.on("join_room", (r) => {
        return socket.join(r);
    });
};
exports.joinRoom = joinRoom;
