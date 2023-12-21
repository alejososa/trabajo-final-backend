import mongoose from "mongoose";

const ticketCollection ="tickets";

const ticketSchema = new mongoose.Schema({
    code:{
        type:String,
        unique:true,
        require:true
    },
    purchaseTime:{
        type:Date,
        default:Date.now
    },
    amount:{
        type:Number,
        required:true
    },
});

const ticketModel= mongoose.model(ticketCollection, ticketSchema);
export default ticketModel;
