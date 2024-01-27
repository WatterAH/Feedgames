export const message = (socket, io) => {
  socket.on("message", (data) => {
    const { user, r, message } = data;
    return io.to(r).emit("message", { user, message });
  });
};
