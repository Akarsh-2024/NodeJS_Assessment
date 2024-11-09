import { Router } from "express";

import {createProject,updateProject,getAllProject,getProjectById} from "../controllers/project.controllers.js"



//creating router object from RouterClass
const projectRouter = Router()



//This route will create new object
projectRouter.post("/create-project",createProject);

//This route will update the project by projectID
projectRouter.put("/update-project/:projectId",updateProject);

//This route will get all project
projectRouter.get("/get-projects",getAllProject);

//This route will get project by projectID
projectRouter.get("/get-project/:projectId",getProjectById);


export {projectRouter}






















