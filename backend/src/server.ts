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

io.on("connection", (socket) => {
  console.log("connected" + socket.id);
});

export { server };
