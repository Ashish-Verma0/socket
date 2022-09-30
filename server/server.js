const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const PORT = process.env.PORT || 8081;

const users = [{}];

const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);

app.get("/", (req, res) => {
  res.send("hello world");
});

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New Connection");
  //  yeha pe frontend se data aa raha hai
  socket.on("joined", ({ userName }) => {
    users[socket.id] = userName;
    console.log(`${userName} has joined`);
    socket.broadcast.emit('userJoined',{user:'Admin',message:`${users[socket.id]} has joined`})
    socket.emit('welcome',{user:"Admin", message:`Welcome to the chat ${users[socket.id]}`})
  });

socket.on('message',({message,id})=>{
io.emit('sendMessage',{user:users[id],message,id})
})

  socket.on("disconnect",()=>{
    socket.broadcast.emit('logout',{user:'Admin', message:`${users[socket.id]} has left`})
    console.log("user left")
  })

});

server.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
