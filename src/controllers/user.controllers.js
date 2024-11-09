import {User} from "../models/user.models.js"
import bcrypt from "bcryptjs";

//This function will register the user
const registerUser = async(req,res)=>{
    try {

        const {email,password,userRole} = req.body;

        if(!email || !password || !userRole){
            return res.status(400).json({
                message:"Email, Password and userRole are required to register user",
                success:false
            });
        }

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({
                message: "User already exist with this email",
                success: false });
        
        
        //if user doesn't exist , then register 
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
           email:email,
           password:hashedPassword,
           userRole:userRole
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });

        
    } catch (error) {
        return res.status(error.code || 500).json({
            success: false,
            message: error.message||"server error"
     })
        
    }
}

export {registerUser}

