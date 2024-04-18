"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = void 0;
const message = (socket, io) => {
    socket.on("message", (data) => {
        const { user, r, message } = data;
        return io.to(r).emit("message", { user, message });
    });
};
exports.message = message;
