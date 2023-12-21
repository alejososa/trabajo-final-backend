import ticketModel from"../DAL/DB/models/ticketModel.js";


class TicketService{

    async generateTicket(ticketInfo){
        try{
            const newTicket =new ticketModel(ticketInfo);
            await newTicket.save();
            return newTicket;
        }catch(error){
            throw error
        }
    }
}

export default new TicketService();