import {Project} from "../models/project.models.js"
import {User} from "../models/user.models.js"

// This function will create a new Project
const createProject = async(req,res)=>{
    try {

        // Here we are checking project_id and name is coming or not 
        const {name,description,creator,projectStatus,expectedReturn,experimentalProject,aiAssistant,sensitive,tagString,collaborators}  =req.body;
        if(!name ){
            return res.status(400).json({
                message:"Project name is required to create project",
                success:false
            });

        }

        //Here we are checking project already present or not
        const existingProject = await Project.findOne({name});
        if(existingProject){
            return res.status(400).json({
                message:"Project is already present",
                success:false
            });
        }



        // Here we are creating new project
        const project  =await Project.create({
            // projectId:projectId,
            name:name,
            description:description,
            creator:creator,
            projectStatus:projectStatus,
            expectedReturn:expectedReturn,
            experimentalProject:experimentalProject,
            aiAssistant:aiAssistant,
            sensitive:sensitive,
            tagString:tagString,
            collaborators:collaborators


        });

        //Here we are checking project is created successfully or not
        if(!project){
            return res.status(500).json({
                message:"Failed to create project",
                success:false
            });
        }

        return res.status(201).json({
            message:"Project created successfully",
            success:true,
            project
        })







        
    } catch (error) {
        return res.status(error.code || 500).json({
                   success: false,
                   message: error.message
            })
    }
}


//This function will Updates an existing project with new information.
const updateProject = async(req,res)=>{
    try {

        const {name,description,creator,projectStatus,expectedReturn,experimentalProject,aiAssistant,sensitive,tagString,collaborators}  =req.body;
        const {projectId} = req.params
        //Here we are checking project id is present or not
        if(!projectId){
            return res.status(400).json({
                message:"Project id is required to update the project",
                success:false
            });
        }

        const updatedProjectDetails = await Project.findByIdAndUpdate(
            projectId,
            {
                $set:{
                    name:name,
                    description:description,
                    creator:creator,
                    projectStatus:projectStatus,
                    expectedReturn:expectedReturn,
                    experimentalProject:experimentalProject,
                    aiAssistant:aiAssistant,
                    sensitive:sensitive,
                    tagString:tagString,
                    collaborators:collaborators


                }
            },
            {new:true}
        );

        //here we are checking detailed updated or not
        if(!updatedProjectDetails){
            return res.status(500).json({
                message:"Updation failed",
                success:false
            });
        }

        return res.status(201).json({
            message:"Details updated successfully",
            success:true,
            updatedProjectDetails
        })


        
    } catch (error) {
        return res.status(error.code || 500).json({
            success: false,
            message: error.message||"Server error"
     })
        
    }
}


//This function will Retrieves all the project
const getAllProject = async(req,res)=>{
    try {

        const page = 1;
        const limit  =10

        // Calculate the number of documents to skip based on the page and limit
        const skip = (page - 1) * limit;

        // Fetch the projects with pagination
        const projects = await Project.find()
            .skip(skip)
            .limit(limit);

        if(!projects){
            return res.status(500).json({
                message:"Details of project is not fetched",
                success:false
            });
        }
        

        // Get the total count of projects
        const totalProjects = await Project.countDocuments();

        return {
            totalProjects,
            totalPages: Math.ceil(totalProjects / limit),
            currentPage: page,
            projects
        };


        
    } catch (error) {
        return res.status(error.code ||500).json({
            message:error.message||"Server error",
            success:false
        })
    }
}



//This function will Retrieves details of a specific project by its `projectId`.
const getProjectById  = async(req,res)=>{
    try {

        const {projectId} = req.params;

        //here we are searching in the data base
        const projectDetails = await Project.findById( projectId );

        if(!projectDetails){
            return res.status(404).json({
                message:"Project not found",
                success:false
            });
        }

        return res.status(201).json({
            message:"Project details fetched successfully",
            success:true,
            projectDetails
        })
        
    } catch (error) {
        return res.status(error.code ||500).json({
            message:error.message||"Server error",
            success:false
        });
    }
}

export {createProject,updateProject,getAllProject,getProjectById}