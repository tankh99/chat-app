const express = require("express")
const bodyParser = require("body-parser")

const app = express()

const http = require("http").createServer(app)
const io = require("socket.io")(http, {
    cors: {
        origin: "*"
    }
})

const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {
  
    // Join a conversation
    const { roomId } = socket.handshake.query;
    socket.join(roomId);
    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
      io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });
  
    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
      socket.leave(roomId);
    });
  });

io.on("connect_failure", (err) => {
    console.log(err)
})


http.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})
