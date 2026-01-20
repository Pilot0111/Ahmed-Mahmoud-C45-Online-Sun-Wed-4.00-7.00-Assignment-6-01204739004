import { Router } from "express";
import {
  getUsers,
  signUp,
  updateUser,
  getUserByEmail,
  getUserById,
} from "./user.service.js";
const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.put("/:id", updateUser);
userRouter.get("/by-email", getUserByEmail);
userRouter.get("/:id", getUserById);

export default userRouter;
