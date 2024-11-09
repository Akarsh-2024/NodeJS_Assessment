import {Collaborator} from "../models/collaborator.models.js"
import { Project } from "../models/project.models.js";


//This function will Adds a new collaborator to a specified project
const addCollaborator = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { collaborator } = req.body; // Collaborator data, expected in the request body

        // Check if collaborator data is present
        if (!collaborator || !collaborator.user || !collaborator.role) {
            return res.status(400).json({
                message: "Collaborator data, user ID, or role is missing",
                success: false
            });
        }

        // Find the project by ID
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({
                message: "Project not found.",
                success: false
            });
        }

        // Create a new collaborator document
        const newCollaborator = new Collaborator({
            user: collaborator.user,     
            project: projectId,          
            role: collaborator.role       
        });

        // Save the new collaborator
        await newCollaborator.save();

        // Add the collaborator's ID to the project's collaborators array
        project.collaborators.push(newCollaborator._id);
        await project.save();

        // Return success response with project details
        return res.status(200).json({
            message: "Collaborator added successfully",
            success: true,
            project,
            newCollaborator
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            success: false
        });
    }
};



//This function will Removes a collaborator from a project
const removeCollaborator = async(req,res)=>{
    try {
        const { projectId, collaboratorId } = req.params;

        // Find the project by projectId
        const project = await Project.findOne({ projectId });
        if (!project) {
            return res.status(404).json({
                 message: "Project not found.",
                 success:false
                });
        }

        // Find the index of the collaborator using the custom collaboratorId field
        const collaboratorIndex = project.collaborators.findIndex(
            collab => collab._id.toString() === collaboratorId
        );
 
        // If the collaborator is not found, return an error
        if (collaboratorIndex === -1) {
            return res.status(404).json({
                 message: "Collaborator not found.",
                 success:false
                });
        }

        // Remove the collaborator from the array
        project.collaborators.splice(collaboratorIndex, 1);

        // Save the updated project
        await project.save();

        return res.status(200).json({ 
            message: "Collaborator removed successfully.",
            success:true,
            project 
        });
        
    } catch (error) {
        return res.status(500).json({
            message:error.message||"Server error",
            success:false
        })
    }
}


// This function will Retrieves a list of all collaborators for a given project.
const getAllCollaborators = async(req,res)=>{
    try {
        //get projectId from url and based on projectId we will return collaborators
        const {projectId} = req.params;

        //here we will find the project via projectId
        const project = await Project.findOne({projectId});

        //check project is present or not
        if(!project){
            return res.status(404).json({
                message:"Project not found",
                success:false
            });
        }


        //if project is present , then we will fetch the list of collaborators
        const collaborators = project.collaborators;


        //check collaborators are present or not
        if(!collaborators){
            return res.status(404).json({
                message:"Collaborators not present in this project",
                success:false
            });
        }

        //if Collaborators present , return them 
        return res.status(200).json({
            message:"Collaborators fetched successfully",
            success:true,
            collaborators
        });
        
    } catch (error) {
        return res.status(500).json({
            message:error.message||"Server Error",
            success:false
        })
    }
}


export {addCollaborator,removeCollaborator,getAllCollaborators}