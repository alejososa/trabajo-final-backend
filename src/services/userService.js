import {userManager}  from "../DAL/DAO/userManager.js";

class UserService{

     async createUser(user){
        try {
            const newUser= await  userManager.create(user);
            return newUser;
        } catch (error) {
            throw new error("Nos epudo crear el usuario")
        }
     }
      
    async findUser(username){
        try {
            const user= await userManager.findUser(username);
            return user;
        } catch (error) {
            throw new error("no se pudo encontrar al usuario");
        }
    }

    async deleteUser(userId){
        try {
            const deletedUser= await userManager.deleteUser(userId);
            return deletedUser;
        } catch (error) {
            throw new error("no se pudo borrar el usuario")
        }
    }

    async deleteInactiUsers(twoDaysAgo){
        try {
            const deletedUsers = await userManager.deleteInactiveUsers(twoDaysAgo);
            return deletedUsers;
        } catch (error) {
            throw new error ("no se pudo eliminar los usuarios")
        }
    }


}


 export const  userService= new UserService();

