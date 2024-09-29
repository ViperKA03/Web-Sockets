const express=require('express')
const http=require('http')
const path=require('path')
const app=express();
const {Server}=require('socket.io')
const server=http.createServer(app);   
const io=new Server(server)

// Sockets
io.on("connection",(socket)=>{
    console.log("A new user has connected",socket.id) 
    socket.on('user-msg',message=>{
        io.emit('message',message)
    })
})

app.use(express.static(path.resolve("./public")));

app.get('/',(req,resp)=>{
    return resp.sendFile('/public/index.html ')
})
server.listen(9000,()=>{
    console.log("Server started at 9000")
})