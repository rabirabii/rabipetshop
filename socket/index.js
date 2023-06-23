const socketIO = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

require("dotenv").config({
  path: "./.env",
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world from socket server!");
});

let users = [];

const addUser = (userId, socketId) => {
  const user = users.find((user) => user.userId === userId);
  if (user) {
    // User already exists, update the socketId and status
    user.socketId = socketId;
    user.online = true;
  } else {
    // New user, add to the users array
    users.push({ userId, socketId, online: true });
  }
};
const removeUser = (socketId) => {
  const index = users.findIndex((user) => user.socketId === socketId);
  if (index !== -1) {
    // Update the user's status to offline
    users[index].online = false;
    // Remove the user from the users array if needed
    if (!users[index].online) {
      users.splice(index, 1);
    }
  }
};

const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};

// Define a message object with a seen property
const createMessage = ({ senderId, receiverId, text, images }) => ({
  senderId,
  receiverId,
  text,
  images,
  seen: false,
});

const createNotification = ({ senderId, receiverId, text }) => ({
  senderId,
  receiverId,
  text,
  timestamp: new Date().getTime(),
});
io.on("connection", (socket) => {
  // when connect
  console.log(`a user is connected`);

  // take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // send and get message
  const messages = {}; // Object to track messages sent to each user

  // When a user adds a friend or starts a conversation
  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
  });

  // When a user sends a private message
  socket.on("privateMessage", ({ roomId, message }) => {
    io.to(roomId).emit("privateMessage", message);
  });
  socket.on(
    "sendMessage",
    ({ senderId, receiverId, text, images, notificationTime }) => {
      const message = createMessage({ senderId, receiverId, text, images });

      const user = getUser(receiverId);

      // Store the messages in the `messages` object
      if (!messages[receiverId]) {
        messages[receiverId] = [message];
      } else {
        messages[receiverId].push(message);
      }

      // send the message to the recevier
      io.to(user?.socketId).emit("getMessage", message);

      // Send Notifications to the recevier
      const notification = createNotification({
        senderId,
        receiverId,
        text: "You have a new message",
        timestamp: notificationTime,
      });
      io.to(user?.socketId).emit("getNotification", notification);
    }
  );

  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);

    // update the seen flag for the message
    if (messages[senderId]) {
      const message = messages[senderId].find(
        (message) =>
          message.receiverId === receiverId && message.id === messageId
      );
      if (message) {
        message.seen = true;

        // send a message seen event to the sender
        io.to(user?.socketId).emit("messageSeen", {
          senderId,
          receiverId,
          messageId,
        });
      }
    }
  });

  // update and get last message
  socket.on("updateLastMessage", ({ lastMessage, lastMessagesId }) => {
    io.emit("getLastMessage", {
      lastMessage,
      lastMessagesId,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log(`a user disconnected!`);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  // Handle the error
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});
server.listen(process.env.PORT || 4000, () => {
  console.log(`server is running on port ${process.env.PORT || 4000}`);
});
