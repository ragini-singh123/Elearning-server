import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database/db.js';
import cors from 'cors';
import Razorpay from 'razorpay';

dotenv.config();

export const instance = new Razorpay({
    key_id: process.env.Razorpay_Key,
    key_secret: process.env.Razorpay_Secret,
});



const app = express();

//using middlewares
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const port = process.env.PORT;

app.get('/', (req, res)=>{
    res.send("server is working");
});

app.use("/uploads", express.static("uploads"));


// importing routes
import userRoutes from './routes/user.js';

//import courses
import courseRoutes from './routes/course.js';
import adminRoutes from './routes/admin.js';


//using routes
app.use('/api', userRoutes);
app.use('/api', courseRoutes);
app.use('/api', adminRoutes);

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`);
    connectDB();
});
