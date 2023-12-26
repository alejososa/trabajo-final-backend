import passport from "passport";
import {userManager} from "../../DAL/DAO/userManager.js";
import userModel from "../../DAL/DB/models/userModel.js";
import { Strategy as LocalStrategy } from "passport-local";
import {compareData} from "../../utils.js";



passport.use("login", new LocalStrategy(

    async function (username, password, done){
        try {
            const userDB= await userManager.findUser(username);
            if(!userDB){
                return done(null, false);
            }
            const isPasswordValid= await compareData(password, userDB.password);
            if(!isPasswordValid){
                return done(null, false);
            }
            userDB.lastConnection = new Date();
            await userDB.save();
            return done (null, userDB);
        } catch (error) {
            done (error);
        }
    }
));



passport.serializeUser((user,done)=>{
    done (null, user._id);
});

passport.deserializeUser(async(id,done)=>{
    try {
        const user= await userModel.findById(id);
        done (null, user);
    } catch (error) {
        done (error);
    }
});