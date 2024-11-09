import { Router } from 'express';

import {addCollaborator,removeCollaborator,getAllCollaborators} from "../controllers/collaborators.controllers.js"


//creating route from RouterClass
const collaboratorRoute = Router()


//This route will add new Collaborator in the project
collaboratorRoute.post("/projects/:projectId/collaborators",addCollaborator);

//This route will remove a collaborator from a project
collaboratorRoute.delete("/projects/:projectId/collaborators/:collaboratorId",removeCollaborator);


//This route will get all collaborators for a specific project
collaboratorRoute.get("/projects/:projectId/collaborators",getAllCollaborators)






export {collaboratorRoute}