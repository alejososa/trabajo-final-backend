import { Router } from "express";
import userModel from "../DAL/DB/models/userModel.js";
import { Long } from "mongodb";

const userRouter =Router();

userRouter.get("/", async (re,res)=>{
    try {
        const users =await userModel.find({});
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

userRouter.delete("/deleteInactives", async (req,res)=>{
    try {
        const twoDaysAgo= new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate()-2);

        const deletedUsers = await userModel.find({lastConnection :{$lt: twoDaysAgo.toISOString()}});
        console.log(deletedUsers);

        
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});




