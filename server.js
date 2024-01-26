const express = require("express")
const {connectDb} = require("./configuration/dbConnection")
require("dotenv").config();
const route = require("./routes/userRoute")
const http = require("http")
const { Server } = require("socket.io");
const path = require("path")

connectDb();
const app = express()
const server = http.createServer(app);
const io = new Server(server);

//Socket.io
io.on("connection", (socket) => {
    socket.on("user-message", (message) => {
        io.emit('message',message)
    })
})

app.use(express.json())
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

app.use("/api", route)
const port = process.env.PORT || 4001

server.listen(port, () => console.log(`Server Started at PORT:9000`));
// app.listen(port, ()=>{
//     console.log(`port is running on ${port}`)
// })

