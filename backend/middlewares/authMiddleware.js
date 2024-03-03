import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const protect = async (req, res, next) => {
    let token;

    // Check for the presence of the Authorization header
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        token = req.headers.authorization.split(" ")[1];

        // Decode the token and retrieve user information
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user information to the request object
        req.user = await User.findById(decoded.id).select("-password");

        // Move to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
};
