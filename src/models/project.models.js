import mongoose, { Schema } from "mongoose"

const projectSchema  = new mongoose.Schema({

    // projectId: { 
    //     type: String,
    //     unique: true,
    //     required: true

    // },
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User"

    },
    projectStatus:{
        type: String,
        enum: ["Draft", "In Progress", "Completed"],
        default: "In Progress"
    },
    expectedReturn:{
        type:String
    },
    experimentalProject:{
        type:Boolean
    },
    aiAssistant:{
        type:Boolean
    },
    sensitive:{
        type:Boolean
    },
    tagString:{
        type:String
    },
    collaborators:[
        {
             type: Schema.Types.ObjectId,
              ref: 'Collaborator'
        }
    ]

},{timestamps: true})


export const Project = mongoose.model("Project",projectSchema);

