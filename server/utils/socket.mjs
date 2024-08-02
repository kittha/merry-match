import { Server } from "socket.io";

const socket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });
  let onlineUsers = {};
  io.on("connection", (socket) => {
    // listen to a new connection
    console.log("A user connected:", socket.id);
    socket.on("add-user", (userId) => {
      onlineUsers[userId] = socket.id;
      console.log("get online users ", onlineUsers);
    });

    // listen for message
    socket.on("send-msg", (msg) => {
      console.log("in send msg", onlineUsers);
      const receiver = onlineUsers[msg.receiver];
      if (receiver) {
        console.log("send", msg, "receiver", receiver);
        socket.to(receiver).emit("receive-msg", msg);
      }
    });

    // handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default socket;
