import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    // userId:{
    //     type:String,
    //     required:true,
    //     unique:true
    // },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userRole:{
        type:String,
        required:true
    }
},{timestamps:true});

export const User = mongoose.model("User",userSchema);
