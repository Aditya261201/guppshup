import {User} from "../models/userModel.js"
import {generateToken} from "../config/generateToken.js";
import bcrypt from "bcrypt";
// import asyncHandler from "express-async-handler"


// --------------------------------------register user---------------------------------------
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, pic } = req.body;


        if (!name || !email || !password) {
            res.status(404).json({
                success: false,
                message: "Please enter all the fields"
            });
        }


        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(404).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            pic
        });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id)
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Failed to create a user"
            });
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Please try again with proper credentials"
        })
    }
}




// -----------------------------auth user---------------------------------
export const authUser = async(req,res) =>{
    try {
        const { email, password } = req.body;


        const user = await User.findOne({ email }).select("+password");
        const ismatch = await bcrypt.compare(password, user.password);

        if (!user) {
            res.status(404).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        if (ismatch) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id)
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Invalid email or password"
            });
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Please try again with proper credentials"
        })
    }
}





// -----------------------------all users---------------------------------
//------------------------------/api/user---------------------------------


export const allUsers=async(req,res)=>{
    const keyword = req.query.search
    ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ]
    }: { };

    // find all users except the logged in himself
    const users = await User.find(keyword).find({_id:{$ne:req.user._id}});
    res.send(users);
}