import TicketService from "../services/ticketService.js";

class TicketController{
    async createTicket(req,res){
        try {
            const ticketData= req.body;
            const newTicket= await TicketService.generateTicket(ticketData);
            res.status(200).json(newTicket);
        } catch (error) {
            res.status(500).json({error:"No se pudo generar el ticket"});
        }
    }
}

export default new TicketController();