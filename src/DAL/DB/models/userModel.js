import mongoose from "mongoose";

const userColletciion= "user";

const userSchema = new mongoose.Schema({

    first_name:{
        type: String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
        
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
    fromGithub:{
        type:Boolean
        
    },
});

const userModel= mongoose.model(userColletciion, userSchema);
export default userModel;