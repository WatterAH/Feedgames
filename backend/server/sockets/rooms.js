export const joinRoom = (socket) => {
  socket.on("join_room", (r) => {
    return socket.join(r);
  });
};
