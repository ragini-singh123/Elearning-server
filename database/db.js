import mongoose from "mongoose";

export const connectDB = async()=> {
    try{
        console.log("Attempting to connect.....");
        await mongoose.connect(process.env.DB);
        console.log("mongoDb connected successfully");
    }
     
    catch(error){
        console.log(error);
    }
}