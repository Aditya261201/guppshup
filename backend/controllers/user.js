import {User} from "../models/userModel.js"
import {generateToken} from "../config/generateToken.js";
import bcrypt from "bcrypt";
// import asyncHandler from "express-async-handler"


// --------------------------------------register user---------------------------------------
export const registerUser = async (req, res) => {
    const { name, email, password, pic } = req.body;


        if(!name || !email || !password){
            res.status(404).json({
                success: false,
                messsage: "Please enter all the fields"
            });
        }


        const userExists = await User.findOne({email});
        if(userExists){
            res.status(404).json({
                success: false,
                messsage: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user  = await User.create({
            name,
            email,
            password: hashedPassword,
            pic
        });
        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id)
            })
        }else{
            res.status(404).json({
                success: false,
                messsage: "Failed to create a user"
            });
        }

}




// -----------------------------auth user---------------------------------
export const authUser = async(req,res) =>{
    const {email,password}= req.body;

    
    const user = await User.findOne({email}).select("+password");
    const ismatch = await bcrypt.compare(password,user.password);

    if(!user){ 
        res.status(404).json({
            success: false,
            messsage: "Invalid email or password"
        });
    } 

    if(ismatch){
        res.json({
            _id : user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }else{
        res.status(404).json({
            success: false,
            messsage: "Invalid email or password"
        });
    }
}