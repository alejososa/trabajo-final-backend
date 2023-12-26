import { Router } from "express";
import { userManager } from "../DAL/DAO/userManager.js";
import { compareData, hashData} from "../utils.js";
import passport from "passport";
import userModel from "../DAL/DB/models/userModel.js";
import UserDTO from "../DAL/DTO/userDto.js";

const sessionRouter = Router();

sessionRouter.post("/register", async(req,res)=>{
    const {first_name, last_name, username, email, password}= req.body;

    if(!first_name || !last_name || !email || !password){
        return res.status(400).json({message:"Complete all fields"});

    }
    const userDB= await userModel.findOne({email});
    if (userDB){
        return res.status(400).json({message:"Email already registered"});

    }

    const hashPassword = await hashData(password);

    const newUser = await userManager.create({
        first_name,
        last_name,
        username: username,
        email,
        password:hashPassword
    });
    res.status(200).json({message:"User created", user: newUser});
    const response= await userModel.create(newUser);
    return response;
});

sessionRouter.post("/login", async (req,res)=>{
    const {email, password}= req.body;

    if(!email || !password){
        return res.status(400).json({message: "Complete all fields"});

    }

    const userDB = await userModel.findOne({email});
    if(!userDB){
        return res.status(400).json({message:"User not exist"});

    }

    const isPasswordValid = await compareData(password, userDB.password);
    if (!isPasswordValid){
        return res.status(400).json({message:"Wrong user or password"});

    }
    if (email ==="adminCoder@coder.com" && password === "1234"){
        console.log("You are admin");

        req.session.user ={
            email: "adminCoder@coder.com",
            role: "ADMIN",
        }
        console.log("Session user admin;", req.session.user);
        res.redirect("/admin");
    }else{
        console.log("Normal user");
        req.session.user={
            first_name: userDB.first_name,
            last_name: userDB.last_name,
            email: userDB.email,
            role:"USER",
        };
        console.log("Session user:", req.session.user);
        res.redirect("/profile");
}    
});

sessionRouter.get("/signout", async (req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/login");
    })
});


export default sessionRouter;