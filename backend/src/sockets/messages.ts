import { Server, Socket } from "socket.io";

export const message = (socket: Socket, io: Server) => {
  socket.on("message", (data: { user: any; r: string; message: string }) => {
    const { user, r, message } = data;
    return io.to(r).emit("message", { user, message });
  });
};
