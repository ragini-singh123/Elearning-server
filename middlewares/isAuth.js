


 import jwt from "jsonwebtoken";
 import { User } from "../models/User.js"; // adjust path as needed

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(403).json({ message: "Please login first." });
    }

    const decodedData = jwt.verify(token, process.env.Jwt_Sec);
    const user = await User.findById(decodedData._id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

export const isAdmin = (req, res, next) =>{
    try {
        if (req.user.role !== "admin") 
            return res.status(403).json({
             message: "You are not admin", });

        next();
        } catch (error) {
            res.status(500).json({ 
                message: error.message, });

        }
        
    
}
