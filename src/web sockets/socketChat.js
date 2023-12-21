import MessageManager from "../DAL/DAO/messageManager.js";

const messageManager= new MessageManager();


const socketChat= (socketServer)=>{
    socketServer.on("connection", async(socket)=>{
        console.log("Usuario conectado id:" + socket.id);

    socketServer.emit("sala de chat", await messageManager.getMesasges());
     
    socket.on("message", async (info)=>{
        await messageManager.createMessage(info);
    
        socketServer.emit("chat", await messageManager.getMesasges());
    });

    socket.on("nuevo usuario", (usuario)=>{
        socket.broadcast.emit("broadcast", usuario);
    });

    socket.on("limpiar char", async ()=>{
        await messageManager.deleteAllMessages();
    });
    });
};

export default socketChat;