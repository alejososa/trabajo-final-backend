import messageModel from "../DB/models/messageModel.js";

class MessageManager{

    async getMesasges(){
     try {
        const messages= await messageModel.find().lean();
        return messages;
     } catch (error) {
        console.error("Error al leer los mensajes");
        return error;
     }
    };

    async createMessage(message){
        try {
            const sendedMessage= await messageModel.create(message);
            return sendedMessage;
        } catch (error) {
            console.error("No se pudo enviar el mensaje", error.message);
            return error;
        }
    };

    async deleteAllMessages(){
        try {
            const response = await messageModel.deleteMany({});
            return response;            
        } catch (error) {
            console.error("No se pudo eliminar todos los mensajes", error.message);
            return error
        }
    }

}

export default MessageManager;