import { app } from "./app.js";
import { Server as SocketServer } from "socket.io";
import http from "http";
import { joinRoom } from "./sockets/rooms.js";
import { message } from "./sockets/messages.js";

const server = http.createServer(app);

const io = new SocketServer(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://feedgames.vercel.app",
      "http://192.168.1.70:19006",
    ],
  },
});

io.on("connection", (socket) => {
  joinRoom(socket);
  message(socket, io);
});

export { server };
