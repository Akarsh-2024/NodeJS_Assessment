import mongoose, { Schema } from "mongoose"

const collaboratorSchema = new mongoose.Schema({

    // collaboratorId:{
    //     type: String,
    //     unique: true,
    //     required: true
    // },
    projectId:{
        type:Schema.Types.ObjectId,
        ref:"Project"
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    userRole:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    assigneeUserId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    approved:{
        type:Boolean
    },
    ideUrl:{
        type:String
    },
    notes:{
        type:String
    }

},{timestamps:true})


export const Collaborator  = mongoose.model("Collaborator",collaboratorSchema);