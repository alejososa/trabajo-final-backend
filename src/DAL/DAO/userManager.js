import userModel from "../DB/models/userModel.js";

class UserManager{
    async create(user){
        try {
            const response= await userModel.create(user);
            return response;
        } catch (error) {
            console.error("No se pud crear el nuevo usuario", error.message);
            return error
        }
    };


    async getUsers(){
        try {
            const usersList= await userModel.find({});
            return usersList;
        } catch (error) {
            console.error("no se pudo obtener lista de users");
        }
    }
    async findUser(username){
        try {
            const user= await userModel.findOne(username);
            return user
        } catch (error) {
            console.error("No se pudo encontrar usuario con ese username", error.message);
            return error
        }
    }

    async deleteUser(userId){
        try {
            const user= await userModel.findByIdAndDelete(userId);
            return user;
        } catch (error) {
            console.error("No se pudo borrar el usuario");
            return error
        }
    }

    async deleteInactiveUsers(twoDaysAgo) {
        const deletedUser=
        await userModel.deleteMany({ lastConnection: { $lt: twoDaysAgo } });
        return deletedUser
    }
};

export const userManager= new UserManager();
