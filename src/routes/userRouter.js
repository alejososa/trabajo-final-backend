import { Router } from "express";
import userModel from "../DAL/DB/models/userModel.js";
import { Long } from "mongodb";
import { userController } from "../controllers/userController.js";

const userRouter =Router();

userRouter.get("/", userController.getUsers);
userRouter.delete("/:userId", userController.deleteUser);
userRouter.delete("/deleteInactives", userController.deleteInactiveUsers);


export default userRouter;

