import { Socket } from "socket.io";

export const joinRoom = (socket: Socket) => {
  socket.on("join_room", (r: string) => {
    return socket.join(r);
  });
};
