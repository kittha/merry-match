import { Server } from "socket.io";

const socket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });
  let onlineUsers = [];
  io.on("connection", (socket) => {
    // listen to a new connection
    console.log("A user connected:", socket.id);
    socket.on("add-user", (userId) => {
      if (!onlineUsers.some((user) => user.userId === userId)) {
        onlineUsers.push({ userId, socketId: socket.id });
      }
      console.log("get online users ", onlineUsers);
    });

    // listen for message
    socket.on("send-msg", (msg) => {
      console.log(onlineUsers);
      const receiver = onlineUsers.filter((user) => {
        console.log("inside", user);
        return user.userId === 10;
        //need to use the receiver_id instead 10
      });
      console.log("send", msg, "receiver", receiver);
      if (receiver.length) {
        socket.to(receiver[0].socketId).emit("receive-msg", msg);
      }
    });

    // handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default socket;
