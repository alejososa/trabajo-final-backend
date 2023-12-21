import mongoose from "mongoose";

const messageCollection ="message";
const messageSchema = new mongoose.Schema({
    user:String,
    message:String
},{timestamps:true}
);

const messageModel= mongoose.model(messageCollection, messageSchema)
export default messageModel;