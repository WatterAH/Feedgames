import { Server, Socket } from "socket.io";

export class SocketController {
  private io: Server;
  private userSocketMap: Record<string, string> = {};

  constructor(io: Server) {
    this.io = io;
  }

  public init() {
    this.io.on("connection", this.handleConnection);
  }

  public getRecipientSocketId = (recipientId: string) => {
    return this.userSocketMap[recipientId];
  };

  private handleConnection = (socket: Socket) => {
    const userId = socket.handshake.query.userId as string | undefined;

    if (userId) {
      socket.join(userId);
      this.userSocketMap[userId] = socket.id;
    }

    this.io.emit("onlineUsers", Object.keys(this.userSocketMap));

    socket.on("disconnect", () => this.handleDisconnect(userId));

    socket.on("join_party", (data) => this.handleJoinParty(socket, data));
    socket.on("leave_party", (data) => this.handleLeaveParty(socket, data));
  };

  private handleJoinParty = (socket: Socket, data: { partyId: string }) => {
    const { partyId } = data;
    socket.join(partyId);
  };

  private handleLeaveParty = (socket: Socket, data: { partyId: string }) => {
    const { partyId } = data;
    socket.leave(partyId);
  };

  private handleDisconnect = (userId?: string) => {
    if (userId) {
      delete this.userSocketMap[userId];
    }
    this.io.emit("onlineUsers", Object.keys(this.userSocketMap));
  };
}
