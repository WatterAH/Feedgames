import { io, Socket } from "socket.io-client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface SocketContextProps {
  socket: Socket | null;
  onlineUsers: string[];
  connectSocket: (url: string, userId: string) => void;
  disconnectSocket: () => void;
}

const defaultSocketContext: SocketContextProps = {
  socket: null,
  onlineUsers: [],
  connectSocket: () => {},
  disconnectSocket: () => {},
};

const SocketContext = createContext<SocketContextProps>(defaultSocketContext);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const connectSocket = (url: string, userId: string) => {
    const newSocket = io(url, {
      query: {
        userId,
      },
    });

    setSocket(newSocket);
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });
    }
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket, onlineUsers, connectSocket, disconnectSocket }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextProps => {
  return useContext(SocketContext);
};
