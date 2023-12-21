import mongoose from "mongoose";

const userColletciion= "user";

const userSchema = new mongoose.Schema({

    first_name:{
        tyoe: String,
        required:true
    },
    last_name:{
        tyoe:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        tyoe:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user",
    },
    fromGithub:{
        type:Boolean,
        default:false
    },
});

const userModel= mongoose.model(userColletciion, userSchema);
export default userModel;