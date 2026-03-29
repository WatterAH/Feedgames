import { app } from "./app";
import { Server as SocketServer } from "socket.io";
import http from "http";

const server = http.createServer(app);

const io = new SocketServer(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://feedgames.vercel.app",
      "http://192.168.1.70:19006",
    ],
  },
});

export const getRecipientSocketId = (recipientId: string) => {
  return userSocketMap[recipientId];
};

const userSocketMap: { [key: string]: string } = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId !== undefined && typeof userId === "string") {
    socket.join(userId);
    userSocketMap[userId] = socket.id;
  }

  io.emit("onlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userId !== undefined && typeof userId === "string") {
      delete userSocketMap[userId];
    }
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

export { server, io };
