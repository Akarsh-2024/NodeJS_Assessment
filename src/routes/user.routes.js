import { Router } from "express";

import {registerUser} from "../controllers/user.controllers.js"

//creating router object from RouterClass
const userRouter = Router()

userRouter.post("/register-user",registerUser);

export {userRouter}

