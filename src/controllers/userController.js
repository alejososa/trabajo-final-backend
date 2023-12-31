import {userService} from "../services/userService.js";

class UserController{

    async createUser(req,res){
        try {
            const newUser= await userService.createUser(req.body);
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    }
    async getUsers(req,res){
        try {
            const usersList= await userService.getUsers()
            res.status(200).json(usersList);
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    }
    async findUserByUsername(req,res){
        const {username}= req.params;
        try {
            if(user){
            res.status(200).json({user});
            }else{
                res.status(404).json({message:"usuario no encontrado"});
            }
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    }
    
    async deleteUser(req,res){
        const{userId}=req.params;
        try {
            const deletedUser= await userService.deleteUser(userId)
            
            res.status(200).json({message:"usuario borrado", deletedUser});
        } catch (error) {
            res.status(500).json({message:"usuario no encontrado"});
        }
    }
    async deleteInactiveUsers(req,res){
        const twoDaysAgo = new Date(Date.now()-2*24*60*1000);
        try {
            const deletedUsers = await userService.deleteInactiveUsers(twoDaysAgo);
            res.status(200).json({message:"usuarios borraros", deletedUsers});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }



}

export const userController= new UserController();