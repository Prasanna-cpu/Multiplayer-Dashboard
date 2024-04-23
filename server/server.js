const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});



let scores_array=[]


io.on("connection", (socket) => {
  socket.on("scores",(scores)=>{
    console.log(scores)
    scores_array.push({...scores,id:socket.id})
    socket.emit("scores_array",scores_array)
    
  })
  setInterval(()=>{
        socket.emit("scores_array", scores_array);
  },5000)
});

httpServer.listen(3000, () => {
  console.log("Server connected");
});
