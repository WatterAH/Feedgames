import http from "http";
import { app } from "./app";
import { SocketController } from "./socketController";
import { Server as SocketServer } from "socket.io";

const server = http.createServer(app);

const io = new SocketServer(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://feedgames.vercel.app",
      "http://192.168.1.70:19006",
      "http://192.168.56.1:3000/",
    ],
  },
});

const socketController = new SocketController(io);
socketController.init();

export { server, io };
