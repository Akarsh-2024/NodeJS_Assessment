import express from "express"
import cors from "cors"


//here we are creating app from express class
const app = express()

//here we are using the cors to get request from specific url 
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));


//using json and urlencoded middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));



//Here we are importing routes
import {projectRouter} from "./src/routes/project.routes.js"
import {collaboratorRoute} from "./src/routes/collaborators.routes.js"
import {userRouter} from "./src/routes/user.routes.js"


//here we are defining routes
app.use("/api/project",projectRouter);
app.use("/api/collaborator",collaboratorRoute);
app.use("/api/user",userRouter);


export {app}


// http://localhost:8000/api/project/
//http://localhost:8000/api/collaborator/
// http://localhost:8000/api/user/