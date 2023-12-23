import { Router } from "express";
import TicketController from "../controllers/ticketController.js";

const ticketRouter= Router();

ticketRouter.post("/ticket", TicketController.createTicket);

export default ticketRouter;